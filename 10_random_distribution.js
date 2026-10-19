const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 50,
    };

    world.pointsX = generateRandomCoordinates(world, world.windowWidth);
    world.frequencies = generateFrequencies(world.pointsX, world.windowWidth);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "Randomness Distribution",
    );
    r.SetTargetFPS(30);

    return world;
}

function generateRandomCoordinates(world, end) {
    const randomPoints = [];
    for (let i = 0; i < world.pointCount; i++) {
        randomPoints.push(generateRandom(end));
    }

    return randomPoints;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function generateRandom(end) {
    const random1 = Math.floor(Math.random() * end);
    const random2 = Math.floor(Math.random() * end);
    const random3 = Math.floor(Math.random() * end);

    return (random1 + random2 + random3) / 3;
}

function drawVerticalBars(world) {
    for (let i = 0; i < world.pointCount; i++) {
        const start = {
            x: world.pointsX[i],
            y: 0,
        };
        const end = {
            x: world.pointsX[i],
            y: world.windowHeight,
        };

        r.DrawLineV(start, end, r.WHITE);
    }
}

function totalElementsIn(array, start, end) {
    let count = 0;

    for (let element of array) {
        if (element >= start && element <= end) {
            count++;
        }
    }

    return {
        start: start,
        end: end,
        freqeuncy: count,
    };
}

function drawFrequencyPoints(world) {
    const frequencies = world.frequencies;
    let prevX = 0;
    let prevY = world.windowHeight;

    for (let i = 0; i < frequencies.length; i++) {
        const X = (frequencies[i].start + frequencies[i].end) / 2;
        const Y = world.windowHeight * (1 - frequencies[i].freqeuncy / world.pointCount)

        r.DrawCircle(X, Y, 5, r.RED);
        r.DrawLineEx({x: prevX, y: prevY}, {x: X, y: Y}, 3, r.RED);

        prevX = X;
        prevY = Y;
    }
}

function generateFrequencies(array, length) {
    const increment = length / 10;
    let start = 0;
    let end = increment;

    const frequencyArray = [];

    while (end <= length) {
        frequencyArray.push(totalElementsIn(array, start, end));
        start += increment;
        end += increment;
    }

    return frequencyArray;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawVerticalBars(world);
    drawFrequencyPoints(world);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while (isRunning()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
    tearDown();
}

main();
