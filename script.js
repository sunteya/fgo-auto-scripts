auto()

if (!requestScreenCapture(true)) {
    toast('请求截图失败')
    exit()
}

sleep(300)

const storage = storages.create("fgo")
const apple = storage.get("apple") || false
const version = storage.get("version") || 1
toast(apple ? '吃苹果' : '不吃苹果')

const SkillY = 880
const MasterSkillY = 479
const RinAvatar = [1230,614]
const Confirm = [1569,655]
const C1S1 = [370,SkillY]
const C1S2 = [507,SkillY]
const C1S3 = [619,SkillY]

const R1S1 = [852,SkillY]
const R1S2 = [997,SkillY]
const R1S3 = [1129,SkillY]

const C3S1 = [1315,SkillY]
const C3S2 = [1452,SkillY]
const C3S3 = [1584,SkillY]

const Battle = [1953,900]
const CardSP = [1199,340]
const Card1= [475,764]
const Card2 = [855,764]

const MasterSkillStart = [2047, MasterSkillY]
const MasterSkill1 = [1633, MasterSkillY]
const MasterSkill2 = [1770, MasterSkillY]
const MasterSkill3 = [1892, MasterSkillY]

const NextImage =  readImage('./assets/next.jpg')
const HelpImage = readImage('./assets/help-v2.jpg')
const GoldAppleImage = readImage('./assets/gold_apple.jpg')
const Attack = readImage('./assets/attack.jpg')

events.on('exit', function() {
    NextImage.recycle()
    HelpImage.recycle()
    GoldAppleImage.recycle()
    Attack.recycle()
})

// click with offset
function click1(x, y) {
    const _x = x+random(-10,10)
    const _y = y+random(-10,10)
    click(_x, _y)
}

function sleep1(t) {
    sleep(t + random(0, 80))
}

function readImage(img) {
    const b = images.read(img)
    return b
}

function findButton(b, options) {
    const maxTimes = options ? options.maxTimes || 100 : 200
    const interval = options ? options.interval || 100  : 100
    const threshold = options ? options.threshold || 0.7 : 0.76
    
    for (let i = 0; i < maxTimes; i++) {
        const point = findImage(captureScreen(), b, { threshold: threshold })
        if (point) {
            return [point.x, point.y]
        }
        sleep1(interval)
    }
    return false
}

function useMasterSkill(i) {
    click1(MasterSkillStart[0], MasterSkillStart[1])
    sleep1(150)
    use(i)
}

function use(i) {
    click1(i[0],i[1])
    sleep1(200)
    click1(Confirm[0],Confirm[1])
    sleep1(100)
    click1(RinAvatar[0],RinAvatar[1])
    sleep1(3000)
}

function fight() {
    click1(Battle[0],Battle[1])
    sleep1(1500)
    click1(CardSP[0],CardSP[1])
    sleep1(500)
    click1(Card1[0],Card1[1])
    sleep1(500)
    click1(Card2[0],Card2[1])
    sleep1(20000)
}

// 宝石翁
function use3TInDiamond() {
    findAttack()
    // 一面

    use(C1S3)
    use(C3S3)
    use(R1S1)
    use(R1S2)


    fight()

    // 二面
    findAttack()
    use(C1S2)
    use(C3S2)
    use(C1S1)
    use(C3S1)
    fight()
    
    

    // 三面
    findAttack()
    use(R1S3)
    fight()
    toast('end')
}

function use2004() {
    findAttack()
    // 一面
    use(C1S3)
    use(C3S3)
    use(R1S1)
    use(R1S2)
    use(C1S2)
    use(C3S2)
    use(C1S1)
    use(C3S1)
    fight()
    
    // 二面
    findAttack()
    useMasterSkill(MasterSkill3)
    use(R1S3)
    fight()
    
    // 三面
    useMasterSkill(MasterSkill1)
    fight()
    toast('end')
}

// 苍玉的魔法少女
function use3TInBlue() {
    findAttack()
    // 一面
    use(C1S2)
    use(C3S2)
    use(C1S3)
    use(C3S3)
    use(R1S1)
    use(R1S2)
    use(C3S1)

    fight()

    // 二面
    findAttack()
    use(C1S1)
    fight()
    
    

    // 三面
    findAttack()
    use(R1S3)
    fight()
    toast('end')
}

function eatApple() {
    if (findButton(GoldAppleImage, {maxTimes:10})) {
        click1(1365, 471)
        sleep1(300)
        click1(1603,835)
        console.log('吃屎啦你')
    } else {
        toast('不用吃苹果')
    }
}

function clickRefresh() {
    let p = findButton(HelpImage, {maxTimes:10, threshold: 0.7})
    while (!p) {
       click1(1566,183)
       sleep1(300)
       click1(1576,842)
       sleep1(3000)
       p = findButton(HelpImage, {maxTimes:100, threshold: 0.7})
       if (p) { 
           break
       }
       sleep1(15000)
       toast('接着找')
    }
    click1(p[0],p[1])
    toast('找到啦')
    sleep1(3000)
}


function findAttack () {
    while (!findButton(Attack, {maxTimes:1})) {
        
    }
    toast('进攻')
    return true
  
}

function nextTurn() {
    let p = null
    while (!p) {
        click1(1920,993)
        sleep1(300)
        p = findButton(NextImage, {maxTimes:1})
    }
    click(1564, 852)

}

function useVersion() {
    switch (version) {
        case 1:
            toast('苍玉的魔法少女')
            use3TInBlue()
        case 2:
             toast('宝石翁')
             use3TInDiamond()
        case 3:
            toast('2004')
            use2004()
    }
}


while (true) {
    useVersion()
    toast('3t end')
    nextTurn()
    sleep1(3000)
    toast('next')
    if (apple) {
        eatApple()
        sleep1(2000)
    }
    clickRefresh()
    toast('1 turn end')
}