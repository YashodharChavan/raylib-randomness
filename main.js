const sketch = require("./01_random_number")

function loop(world) {
    while(sketch.isRunning()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const world = sketch.setup()
    loop(world);
    sketch.tearDown();
}

main();