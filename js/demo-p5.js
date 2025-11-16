/**
 * P5.js Visualization for Copyright Enforcement Demo
 * Creates abstract visual representations of content types
 */

let sketch = function(p) {
    let canvas;
    let contentType = 'Audio';
    let animationFrame = 0;
    let colors = {
        primary: '#1e3a5f',
        accent: '#2d9596',
        background: '#f8f9fa'
    };

    p.setup = function() {
        // Create canvas that's responsive
        let canvasWidth = Math.min(600, p.windowWidth - 40);
        let canvasHeight = 300;

        canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('p5Container');
        p.frameRate(30);
    };

    p.draw = function() {
        p.background(colors.background);
        animationFrame++;

        // Get current case data if demo is active
        if (window.copyrightDemo && window.copyrightDemo.currentCase) {
            contentType = window.copyrightDemo.currentCase.contentType;
        }

        // Draw based on content type
        switch(contentType) {
            case 'Audio':
                drawAudioVisualization();
                break;
            case 'Video':
                drawVideoVisualization();
                break;
            case 'Image':
                drawImageVisualization();
                break;
            default:
                drawDefaultVisualization();
        }

        // Draw label
        drawLabel();
    };

    function drawAudioVisualization() {
        // Animated waveform
        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.noFill();
        p.stroke(colors.accent);
        p.strokeWeight(3);

        p.beginShape();
        for (let x = -p.width / 2; x < p.width / 2; x += 5) {
            let angle = p.map(x, -p.width / 2, p.width / 2, 0, p.TWO_PI * 3);
            let y = p.sin(angle + animationFrame * 0.05) * 50;
            y += p.sin(angle * 2 + animationFrame * 0.03) * 25;
            p.vertex(x, y);
        }
        p.endShape();

        // Second waveform
        p.stroke(colors.primary);
        p.strokeWeight(2);
        p.beginShape();
        for (let x = -p.width / 2; x < p.width / 2; x += 5) {
            let angle = p.map(x, -p.width / 2, p.width / 2, 0, p.TWO_PI * 2);
            let y = p.cos(angle + animationFrame * 0.04) * 30;
            p.vertex(x, y);
        }
        p.endShape();
        p.pop();

        // Frequency bars
        drawFrequencyBars();
    }

    function drawFrequencyBars() {
        p.push();
        let barCount = 20;
        let barWidth = p.width / (barCount * 1.5);
        let spacing = barWidth * 0.5;

        p.translate((p.width - (barCount * (barWidth + spacing))) / 2, p.height - 50);

        for (let i = 0; i < barCount; i++) {
            let barHeight = p.sin(animationFrame * 0.05 + i * 0.5) * 30 + 40;
            barHeight += p.random(-5, 5);

            p.fill(colors.accent);
            p.noStroke();
            p.rect(i * (barWidth + spacing), -barHeight, barWidth, barHeight, 2);
        }
        p.pop();
    }

    function drawVideoVisualization() {
        // Film strip effect
        let frameCount = 5;
        let frameWidth = (p.width - 60) / frameCount;
        let frameHeight = p.height - 100;

        p.push();
        p.translate(30, 50);

        for (let i = 0; i < frameCount; i++) {
            let x = i * (frameWidth + 10);

            // Frame border
            p.fill(30);
            p.rect(x - 5, -5, frameWidth + 10, frameHeight + 10);

            // Frame content
            let offset = (animationFrame + i * 10) % 100;
            let brightness = p.map(p.sin(animationFrame * 0.05 + i), -1, 1, 100, 200);

            // Gradient effect
            for (let y = 0; y < frameHeight; y += 2) {
                let c = p.lerpColor(
                    p.color(colors.primary),
                    p.color(colors.accent),
                    (y + offset) / frameHeight
                );
                p.stroke(c);
                p.line(x, y, x + frameWidth, y);
            }

            // Film perforations
            p.fill(200);
            for (let j = 0; j < 8; j++) {
                let py = j * (frameHeight / 8);
                p.rect(x - 3, py, 2, 8);
                p.rect(x + frameWidth + 1, py, 2, 8);
            }
        }
        p.pop();
    }

    function drawImageVisualization() {
        // Abstract geometric composition
        p.push();
        p.translate(p.width / 2, p.height / 2);

        let rotation = animationFrame * 0.01;

        // Rotating squares
        for (let i = 0; i < 3; i++) {
            p.push();
            p.rotate(rotation * (i + 1) * 0.5);

            let size = 150 - (i * 40);
            let alpha = 150 - (i * 30);

            p.fill(p.color(colors.accent + p.hex(alpha, 2)));
            p.noStroke();
            p.rectMode(p.CENTER);
            p.rect(0, 0, size, size, 10);
            p.pop();
        }

        // Circles
        for (let i = 0; i < 4; i++) {
            let angle = (p.TWO_PI / 4) * i + rotation;
            let x = p.cos(angle) * 80;
            let y = p.sin(angle) * 80;

            p.fill(p.color(colors.primary));
            p.circle(x, y, 30);
        }

        p.pop();

        // Color palette bars
        drawColorPalette();
    }

    function drawColorPalette() {
        p.push();
        let barWidth = p.width / 6;
        let barHeight = 20;

        p.translate(0, p.height - barHeight - 10);

        let paletteColors = [
            p.color(colors.primary),
            p.color(colors.accent),
            p.color('#f39c12'),
            p.color('#e74c3c'),
            p.color('#27ae60'),
            p.color('#9b59b6')
        ];

        for (let i = 0; i < 6; i++) {
            p.fill(paletteColors[i]);
            p.noStroke();
            p.rect(i * barWidth, 0, barWidth, barHeight);
        }
        p.pop();
    }

    function drawDefaultVisualization() {
        // Abstract data visualization
        p.push();
        p.translate(p.width / 2, p.height / 2);

        let points = 12;
        let radius = 100;

        p.noFill();
        p.stroke(colors.accent);
        p.strokeWeight(2);

        // Outer circle
        p.circle(0, 0, radius * 2);

        // Data points
        p.fill(colors.primary);
        for (let i = 0; i < points; i++) {
            let angle = (p.TWO_PI / points) * i + animationFrame * 0.01;
            let r = radius + p.sin(animationFrame * 0.05 + i) * 20;
            let x = p.cos(angle) * r;
            let y = p.sin(angle) * r;

            p.circle(x, y, 12);

            // Connecting lines
            if (i > 0) {
                let prevAngle = (p.TWO_PI / points) * (i - 1) + animationFrame * 0.01;
                let prevR = radius + p.sin(animationFrame * 0.05 + i - 1) * 20;
                let prevX = p.cos(prevAngle) * prevR;
                let prevY = p.sin(prevAngle) * prevR;

                p.stroke(colors.accent);
                p.line(prevX, prevY, x, y);
            }
        }
        p.pop();
    }

    function drawLabel() {
        p.push();
        p.fill(60);
        p.noStroke();
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(16);
        p.textStyle(p.BOLD);
        p.text(`Content Type: ${contentType}`, p.width / 2, 10);
        p.pop();
    }

    p.windowResized = function() {
        let canvasWidth = Math.min(600, p.windowWidth - 40);
        let canvasHeight = 300;
        p.resizeCanvas(canvasWidth, canvasHeight);
    };
};

// Create P5 instance
if (document.getElementById('p5Container')) {
    new p5(sketch);
}
