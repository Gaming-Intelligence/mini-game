import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import p5 from 'p5';

const FullScreenGame = () => {
    const sketchRef = useRef();
    const navigate = useNavigate();
    let prevTouchX = null;
    let prevTouchY = null;

    useEffect(() => {
        const sketch = (p) => {
            let screen_width;
            let screen_height;
            let coins = [];
            let score = 0;
            let base_radius = 25;
            let backgroundImage;
            let goldCoinImage, silverCoinImage, bronzeCoinImage, newCoinImage;
            let imageLoaded = false;
            let totalCoins = 155;
            let coinsReleased = 0;
            let gameEnded = false;
            let freezeTime = 3000;
            let isFrozen = false;
            let freezeStart = 0;
            let lastCoinReleaseTime = 0;
            let coinDistribution = {
                silver: 95,
                gold: 50,
                bronze: 6,
                new: 4
            };
            let coinInterval;
            let particles = [];
            let fadeAmount = 0;
            let fadingIn = true;

            p.preload = () => {
                backgroundImage = p.loadImage('/images/background2.jpg', () => {
                    imageLoaded = true;
                });
                goldCoinImage = p.loadImage('/images/gi_coin.png');
                silverCoinImage = p.loadImage('/images/new_coin.png');
                bronzeCoinImage = p.loadImage('/images/bull_coin.png');
                newCoinImage = p.loadImage('/images/bear_coin.png');
            };

            p.setup = () => {
                screen_width = p.windowWidth;
                screen_height = p.windowHeight;
                p.createCanvas(screen_width, screen_height);
                p.textSize(screen_height * 0.05);
                p.textAlign(p.LEFT, p.TOP);
                coinInterval = 45 * 1000 / totalCoins;
            };

            p.draw = () => {
                if (!imageLoaded) {
                    p.background(50);
                    p.fill(255);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(32);
                    p.text('Loading...', screen_width / 2, screen_height / 2);
                    return;
                }

                p.image(backgroundImage, 0, 0, screen_width, screen_height);

                particles.forEach((particle, i) => {
                    particle.update();
                    particle.draw();
                    if (particle.isFinished()) {
                        particles.splice(i, 1);
                    }
                });

                if (isFrozen) {
                    if (p.millis() - freezeStart >= freezeTime) {
                        isFrozen = false;
                        lastCoinReleaseTime += p.millis() - freezeStart;
                    } else {
                        displayGame();
                        return;
                    }
                }

                let currentTime = p.millis();
                if (coinsReleased < totalCoins && currentTime - lastCoinReleaseTime >= coinInterval) {
                    let coinType = getNextCoinType();
                    if (coinType) {
                        let fallDuration = screen_height / 45;
                        let speed = screen_height / fallDuration;
                        coins.push(new Coin(coinType, speed));
                        coinsReleased++;
                        lastCoinReleaseTime = currentTime;
                    }
                }

                coins.forEach((coin, i) => {
                    coin.update();
                    coin.draw();

                    if (coin.collected || coin.y > screen_height + coin.radius) {
                        coins.splice(i, 1);

                        if (coinsReleased >= totalCoins && coins.length === 0) {
                            endGame();
                        }
                    }
                });

                p.fill(255);
                p.text(`Score: ${score}`, screen_width * 0.02, screen_height * 0.02);

                if (gameEnded) {
                    showGameOverPopup();
                } else if (fadingIn) {
                    fadeInEffect();
                }

                // Swipe-based coin collection
                if (prevTouchX !== null && prevTouchY !== null) {
                    collectCoinsAlongSwipe(prevTouchX, prevTouchY, p.touches[0].x, p.touches[0].y);
                }

                // Update previous touch coordinates
                if (p.touches.length > 0) {
                    prevTouchX = p.touches[0].x;
                    prevTouchY = p.touches[0].y;
                }
            };

            const fadeInEffect = () => {
                p.fill(0, 0, 0, 255 - fadeAmount);
                p.rect(0, 0, screen_width, screen_height);
                fadeAmount += 5;
                if (fadeAmount >= 255) {
                    fadingIn = false;
                }
            };

            const fadeOutEffect = (callback) => {
                p.fill(0, 0, 0, fadeAmount);
                p.rect(0, 0, screen_width, screen_height);
                fadeAmount += 5;
                if (fadeAmount >= 255) {
                    callback();
                }
            };

            const collectCoins = () => {
                for (let t = 0; t < p.touches.length; t++) {
                    let touchX = p.touches[t].x;
                    let touchY = p.touches[t].y;

                    for (let i = coins.length - 1; i >= 0; i--) {
                        if (coins[i].isCollected(touchX, touchY)) {
                            if (coins[i].coinType === "new") {
                                score = Math.floor(score * 0.5);
                            } else {
                                score += coins[i].value;
                            }

                            if (coins[i].coinType === "bronze") {
                                triggerFreeze();
                            }

                            createParticles(coins[i].x, coins[i].y);
                            coins.splice(i, 1);

                            if (coinsReleased >= totalCoins && coins.length === 0) {
                                endGame();
                            }
                        }
                    }
                }
            };

            const collectCoinsAlongSwipe = (x1, y1, x2, y2) => {
                for (let i = coins.length - 1; i >= 0; i--) {
                    if (isCoinCollectedAlongSwipe(coins[i], x1, y1, x2, y2)) {
                        if (coins[i].coinType === "new") {
                            score = Math.floor(score * 0.5);
                        } else {
                            score += coins[i].value;
                        }

                        if (coins[i].coinType === "bronze") {
                            triggerFreeze();
                        }

                        createParticles(coins[i].x, coins[i].y);
                        coins.splice(i, 1);

                        if (coinsReleased >= totalCoins && coins.length === 0) {
                            endGame();
                        }
                    }
                }
            };

            const isCoinCollectedAlongSwipe = (coin, x1, y1, x2, y2) => {
                let touchRadius = coin.radius * 1;
                let distanceToStart = p.dist(coin.x, coin.y, x1, y1);
                let distanceToEnd = p.dist(coin.x, coin.y, x2, y2);
                return distanceToStart < touchRadius || distanceToEnd < touchRadius;
            };

            const triggerFreeze = () => {
                isFrozen = true;
                freezeStart = p.millis();
            };

            class Coin {
                constructor(coinType, speed) {
                    this.radius = base_radius * (screen_height / 600);
                    this.x = p.random(this.radius, screen_width - this.radius);
                    this.y = -this.radius;
                    this.coinType = coinType;
                    this.angle = 0;

                    if (this.coinType === "gold") {
                        this.image = goldCoinImage;
                        this.value = 500;
                    } else if (this.coinType === "silver") {
                        this.image = silverCoinImage;
                        this.value = 100;
                    } else if (this.coinType === "bronze") {
                        this.image = bronzeCoinImage;
                        this.value = 0;
                    } else if (this.coinType === "new") {
                        this.image = newCoinImage;
                        this.value = 0;
                    }

                    this.speed = speed * 0.1;
                    this.collected = false;
                }

                update() {
                    this.y += this.speed;
                    this.angle += 0.05;
                }

                draw() {
                    p.push();
                    p.translate(this.x, this.y);
                    p.rotate(this.angle);
                    p.imageMode(p.CENTER);
                    p.image(this.image, 0, 0, this.radius * 2, this.radius * 2);
                    p.pop();
                }

                isCollected(mx, my) {
                    let touchRadius = this.radius * 1;
                    let distance = p.dist(this.x, this.y, mx, my);
                    return distance < touchRadius;
                }
            }

            const createParticles = (x, y) => {
                for (let i = 0; i < 20; i++) {
                    particles.push(new Particle(x, y));
                }
            };

            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.size = p.random(5, 10);
                    this.color = p.color(p.random(255), p.random(255), p.random(255));
                    this.xSpeed = p.random(-2, 2);
                    this.ySpeed = p.random(-2, 2);
                    this.lifespan = 255;
                }

                update() {
                    this.x += this.xSpeed;
                    this.y += this.ySpeed;
                    this.lifespan -= 4;
                }

                draw() {
                    p.noStroke();
                    p.fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
                    p.ellipse(this.x, this.y, this.size);
                }

                isFinished() {
                    return this.lifespan <= 0;
                }
            }

            const displayGame = () => {
                p.fill(255);
                p.text(`Score: ${score}`, screen_width * 0.02, screen_height * 0.02);
            };

            const endGame = () => {
                gameEnded = true;
                freezeStart = p.millis();
                fadeAmount = 0;
                setTimeout(() => navigateToHome(), 5000);
            };

            const navigateToHome = () => {
                navigate('/home', { state: { score: score } });
            };

            const showGameOverPopup = () => {
                p.fill(0, 0, 0, 200);
                p.rect(0, 0, screen_width, screen_height);

                p.fill(255);
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(32);
                p.text('Game Over', screen_width / 2, screen_height / 2 - 50);
                p.text(`Your Score: ${score}`, screen_width / 2, screen_height / 2);

                p.fill(255);
                p.rect(screen_width / 2 - 100, screen_height / 2 + 50, 200, 50, 20);
                p.fill(0);
                p.textSize(20);
                p.text('Collect', screen_width / 2, screen_height / 2 + 75);

                p.noLoop();
            };

            const getNextCoinType = () => {
                let r = p.random(0, totalCoins);
                if (r < coinDistribution.silver) {
                    coinDistribution.silver--;
                    return "silver";
                } else if (r < coinDistribution.silver + coinDistribution.gold) {
                    coinDistribution.gold--;
                    return "gold";
                } else if (r < coinDistribution.silver + coinDistribution.gold + coinDistribution.bronze) {
                    coinDistribution.bronze--;
                    return "bronze";
                } else if (r < coinDistribution.silver + coinDistribution.gold + coinDistribution.bronze + coinDistribution.new) {
                    coinDistribution.new--;
                    return "new";
                }
                return null;
            };

            p.mousePressed = () => {
                if (gameEnded) {
                    if (p.mouseX >= screen_width / 2 - 100 && p.mouseX <= screen_width / 2 + 100 && p.mouseY >= screen_height / 2 + 50 && p.mouseY <= screen_height / 2 + 100) {
                        navigateToHome();
                    }
                }
            };

            p.touchStarted = () => {
                if (gameEnded) {
                    if (p.mouseX >= screen_width / 2 - 100 && p.mouseX <= screen_width / 2 + 100 && p.mouseY >= screen_height / 2 + 50 && p.mouseY <= screen_height / 2 + 100) {
                        navigateToHome();
                    }
                }
            };

            p.windowResized = () => {
                screen_width = p.windowWidth;
                screen_height = p.windowHeight;
                p.resizeCanvas(screen_width, screen_height);
            };
        };

        sketchRef.current = new p5(sketch);

        return () => {
            sketchRef.current.remove();
        };
    }, [navigate]);

    return (
        <div ref={sketchRef} />
    );
};

export default FullScreenGame;