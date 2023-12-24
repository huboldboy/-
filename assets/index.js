class ChristmasTree {
    constructor() {
        this.side = 20
        this.gap = 6 + this.side
        this.init()
        this.treeData = []
    }

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')
        const { width, height } = this.canvas
        this.width = width
        this.height = height
        this.ctx.fillStyle = 'rgb(0, 0, 0)'
        this.ctx.fillRect(0, 0, width, height)
    }

    createArc(x, y, color) {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.arc(x, y, this.side / 2, 0, Math.PI * 2, false)
        this.ctx.fill()
    }

    createRect(x, y, color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, this.side, this.side)
    }

    createPentastar(x, y, color) {
        this.ctx.beginPath()
        const R = this.gap / 2,
            r = this.gap / 5

        for (var i = 0; i < 5; i++) {
            this.ctx.lineTo(
                Math.cos(((18 + i * 72) / 180) * Math.PI) * R + x, -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + y
            )
            this.ctx.lineTo(
                Math.cos(((54 + i * 72) / 180) * Math.PI) * r + x, -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + y
            )
        }
        this.ctx.closePath()
        this.ctx.lineWidth = '3'
        this.ctx.fillStyle = color
        this.ctx.fill()
    }

    buildTreeCrown(startNodeNum, rowsNum, startHeight) {
        const arr = []
        const midRect = this.width / 2 - this.side / 2
        const midArc = this.width / 2
        for (let i = 0; i < rowsNum; i++) {
            for (let j = 0; j < startNodeNum; j++) {
                if (rowsNum - i === 2 && startNodeNum - j <= 2) {
                    arr.push({
                        type: 'start',
                        x: midArc + (j % 2 === 0 ? (-this.gap * j) / 2 : (+(j + 1) / 2) * this.gap),
                        y: startHeight + this.gap * i + this.side / 2,
                        color: rowsNum - i === 1 ? 'red' : 'yellow'
                    })
                } else if (rowsNum - i === 1 && startNodeNum - j <= 2) {
                    arr.push({
                        type: 'arc',
                        x: midArc + (j % 2 === 0 ? (-this.gap * j) / 2 : (+(j + 1) / 2) * this.gap),
                        y: startHeight + this.gap * i + this.side / 2,
                        color: 'red'
                    })
                } else {
                    arr.push({
                        type: 'rect',
                        x: midRect + (j % 2 === 0 ? (-this.gap * j) / 2 : (+(j + 1) / 2) * this.gap),
                        y: startHeight + this.gap * i,
                        color: i === rowsNum - 1 && startNodeNum - j >= 7 ? 'red' : 'green'
                    })
                }
            }
            if (i === rowsNum - 3) {
                startNodeNum += 4
            } else {
                startNodeNum += 2
            }
        }
        return arr
    }

    buildTreeStump(row, col, gapRow) {
        const arr = []
        const midRect = this.width / 2 - this.side / 2
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                arr.push({
                    type: 'rect',
                    x: midRect + (j % 2 === 0 ? (-this.gap * j) / 2 : (+(j + 1) / 2) * this.gap),
                    y: (gapRow + i) * this.gap,
                    color: 'rgb(67, 11, 0)'
                })
            }
        }
        return arr
    }

    setTreeData() {
        const _this = this
        let gapRow = 1

        this.treeData = [{
                type: 'start',
                x: this.width / 2,
                y: this.side / 2 + 2,
                color: 'yellow'
            },
            ...setTreeCrownData(3),
            ...this.buildTreeStump(5, 3, gapRow)
        ]

        function setTreeCrownData(crownNum) {
            const arr = []
            let indexNode = 1
            let rowsNum = 4

            for (let i = 0; i < crownNum; i++) {
                arr.push(..._this.buildTreeCrown(indexNode, rowsNum, _this.gap * gapRow))
                indexNode += 2
                gapRow += rowsNum
            }
            return arr
        }
    }

    renderTree() {
        this.setTreeData()
        for (const item of this.treeData) {
            if (item.type === 'arc') {
                const { x, y, color } = item
                this.createArc(x, y, color)
            } else if (item.type === 'rect') {
                const { x, y, color } = item
                this.createRect(x, y, color)
            } else if (item.type === 'start') {
                const { x, y, color } = item
                this.createPentastar(x, y, color)
            }
        }
    }
}