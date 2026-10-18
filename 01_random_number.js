const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 1000,
    };

    world.pointsX = generateRandomCoordinates(world, world.windowWidth);
    world.pointsY = generateRandomCoordinates(world, world.windowHeight);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "Random Position");
    r.SetTargetFPS(30);

    return world;
}

function generateRandomCoordinates(world, end) {
    const randomPoints = []
    for(let i=0; i<world.pointCount; i++) {
        randomPoints.push(generateRandom(end));
    }

    return randomPoints
}

function isRunning() {
    return !r.WindowShouldClose();
}

function generateRandom(end) {
    return Math.floor(Math.random() * end);
}

function drawPoints(world) {
    for(let i=0; i<world.pointCount; i++) {
        const posX = world.pointsX[i];
        const posY = world.pointsY[i];

        r.DrawCircle(posX, posY, 5, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    
    drawPoints(world);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while(isRunning()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup()
    loop(world);
    tearDown();
}

main();