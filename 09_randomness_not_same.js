const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 50,
    };

    world.pointsX = generateRandomCoordinates(world, world.windowWidth);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "Random Position");
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
    const random1 = Math.floor(Math.random() * end)
    const random2 = Math.floor(Math.random() * end)
    const random3 = Math.floor(Math.random() * end)

    return (random1 + random2 + random3) / 3;
}

function drawPoints(world) {
    for (let i = 0; i < world.pointCount; i++) {
        const start = {
            x: world.pointsX[i],
            y: 0,
        };
        const end = {
            x: world.pointsX[i],
            y: world.windowHeight,
        };
        r.DrawLineEx(start, end, 1, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawPoints(world);

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
