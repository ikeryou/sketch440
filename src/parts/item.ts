import { Vector2, Vector3 } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Val } from "../libs/val";
import { Conf } from "../core/conf";
import { Func } from "../core/func";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _itemId: number = 0
  private _items: Array<HTMLInputElement> = []
  private _itemsCheck: Array<Val> = []
  private _isChecked: boolean = false
  private _useKey: Array<number> = []
  private _t:number = 0.05
  private _it: number = 0.04

  constructor(opt:any) {
    super(opt)

    this._itemId = opt.itemId

    const num = Func.val(5, 10)
    for (let i = 0; i < num; i++) {
      const el = document.createElement('input') as HTMLInputElement
      el.classList.add('js-item-input')
      el.type = 'checkbox'
      el.checked = false
      this.el.appendChild(el)
      this._items.push(el)

      this._itemsCheck.push(new Val())

      this._useKey.push(i)
    }
    // Util.shuffle(this._useKey)

    this._resize()
  }

  public show():void {
    if(this._isChecked) return
    this._isChecked = true

    this._itemsCheck.forEach((item, i) => {
      Tween.a(item, {
        val: [0, 1]
      }, this._t, i * this._it, Tween.EaseNone)
    })
  }

  public hide():void {
    if(!this._isChecked) return
    this._isChecked = false

    this._itemsCheck.forEach((item, i) => {
      Tween.a(item, {
        val: 0
      }, this._t, i * this._it, Tween.EaseNone)
    })
  }

  protected _update():void {
    super._update()

    this._items.forEach((item, i) => {
      const key = this._useKey[i]
      item.checked = this._itemsCheck[key].val >= 1
    })
  }

  protected  _resize(): void {
    super._resize()

    let lineSize = Conf.LINE_SIZE.height * Func.val(0.7, 1)
    let inputSize = Conf.LINE_SIZE.width
    const center = new Vector2(
      lineSize * 0.5,
      lineSize * 1,
    )

    const kake = 0.8
    this._items.forEach((item) => {
      Tween.set(item, {
        width: inputSize * kake,
        height: inputSize * kake,
      })
    })

    const item = {
      rotation: new Vector3(),
      position: new Vector3(),
    }

    const i = this._itemId

    if(i === 0 || i === 3 || i === 6) {
      lineSize -= inputSize * 1
    }

    if(i === 0) {
      item.rotation.z = 90
      item.position.y = lineSize + inputSize * 0.5
    }

    if(i === 1) {
      item.rotation.z = 0
      item.position.x = lineSize * 0.5
      item.position.y = lineSize * 0.5
    }

    if(i === 2) {
      item.rotation.z = 0
      item.position.x = -lineSize * 0.5
      item.position.y = lineSize * 0.5
    }

    if(i === 3) {
      item.rotation.z = 90
      item.position.x = lineSize * 0
      item.position.y = lineSize * 0
    }

    if(i === 4) {
      item.rotation.z = 0
      item.position.x = lineSize * 0.5
      item.position.y = lineSize * -0.5
    }

    if(i === 5) {
      item.rotation.z = 0
      item.position.x = -lineSize * 0.5
      item.position.y = lineSize * -0.5
    }

    if(i === 6) {
      item.rotation.z = 90
      item.position.x = lineSize * 0
      item.position.y = lineSize * -1 - inputSize * 0.5
    }

    Tween.set(this.el, {
      rotationZ: item.rotation.z,
      x: center.x + item.position.x,
      y: center.y + item.position.y * -1 - lineSize * 0.5,
      height: lineSize * 0.9,
      width: inputSize,
    })
  }
}







