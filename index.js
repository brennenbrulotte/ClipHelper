const WHITE = '&f';
const AQUA = '&b';
const BOLD = '&l';
const RESET = '&r';
const prefix = `${BOLD}${AQUA}ClipHelper ${WHITE}>${RESET}${WHITE}`

let key = new KeyBind("Clip Helper", Keyboard.KEY_NONE, "! Clip Helper")
let BlockPoss = Java.type("net.minecraft.util.BlockPos");
let enabled = false;

function setToAir(x, y, z) {
    const pos = new BlockPos(x * 1, y * 1, z * 1);
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(pos.toMCBlock());
}

key.registerKeyPress(() => {
    enabled = !enabled
    ChatLib.chat(`${prefix} ${enabled ? "On" : "Off"}`)
})

register('tick', () => {
    if(!enabled) return;
    let playerPos = new BlockPoss(Math.floor(Player.getX()), Math.floor(Player.getY()), Math.floor(Player.getZ()))
    let iterable = BlockPoss.func_177980_a(
        playerPos.func_177963_a(1, 2, 1),
        playerPos.func_177963_a(-1, 0, -1)
    )

    iterable.forEach(bp => {
        let pos = new BlockPos(bp);
        let block = World.getBlockAt(pos);

        if(block.type.getID() == 69 || block.type.getID() == 54 || block.type.getID() == 146) return;
        setToAir(pos.x, pos.y, pos.z);
    })
})
