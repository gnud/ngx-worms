import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

class Player {
  private ctx: CanvasRenderingContext2D;
  bodyTotal: number = 1;
  blockSize = 10;
  playerX: number = 0;
  playerY: number = 0;

  constructor(
    ctx: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
  }

  draw(start, end, direction) {
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.closePath();

    if (direction) {
      for (let part = start; part < (this.bodyTotal * this.blockSize + start); part += this.blockSize) {
        console.log(start, end);
        this.bodyBox(part, end);
      }
    }

    if (!direction) {
      let pno = 1;
      for (let part = end; part < (this.bodyTotal * this.blockSize + end); part += this.blockSize) {
        console.log(`part: ${start}, ${part}, ${direction} of ${pno}`);
        this.bodyBox(start, part);
        pno++;
      }
    }
  }

  grow() {
    this.bodyTotal++;
  }

  private bodyBox(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#6865ff';
    this.ctx.fillRect(x, y, 10, 10);
    this.ctx.closePath();
  }

  checkCollision(position: number[]) {
    const isCoinX = this.playerX == position[0];
    const isCoinY = this.playerY == position[1];
    return isCoinX && isCoinY;
  }

  moveDown() {
    this.playerY += this.blockSize;
    if (this.playerY > this.ctx.canvas.height - this.blockSize) {
      this.playerY = this.ctx.canvas.width - this.blockSize
    }

    this.draw(this.playerX, this.playerY, false);
  }

  moveUp() {
    this.playerY -= this.blockSize;
    if (this.playerY < 0) {
      this.playerY = 0
    }

    this.draw(this.playerX, this.playerY, false);
  }

  moveLeft() {
    this.playerX -= this.blockSize;
    if (this.playerX < 0) {
      this.playerX = 0
    }

    this.draw(this.playerX, this.playerY, true);
  }

  moveRight() {
    this.playerX += this.blockSize;
    if (this.playerX > this.ctx.canvas.width - this.blockSize) {
      this.playerX = this.ctx.canvas.width - this.blockSize
    }

    this.draw(this.playerX, this.playerY, true);
  }
}


class Coin {
  coinCoord: number[] = [0, 20];
  private ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public randomCoin() {
    this.disposeCoin();

    this.coinCoord[0] = Math.round(Coin.getRandomInt(1, 52) * 10);
    this.coinCoord[1] = 30;

    this.drawCoin();
  }

  public die() {
    this.randomCoin();
  }

  private disposeCoin() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(this.coinCoord[0], this.coinCoord[1], 10, 10);
    this.ctx.closePath();
  }

  private drawCoin() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fff542';
    this.ctx.fillRect(this.coinCoord[0], this.coinCoord[1], 10, 10);
    this.ctx.closePath();
  }

  repaintCoin() {
    this.drawCoin();
  }

  getPosition() : number[] {
    return this.coinCoord;
  }
}

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})


export class SceneComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  ctx: CanvasRenderingContext2D;
  player: Player;
  coin: Coin;

  constructor() {
  }

  ngOnInit() {
    // Set stage
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    this.createActors();
    this.prepareActors();
  }

  private createActors() {
    // Actors
    this.player = new Player(this.ctx);
    this.coin = new Coin(this.ctx);
  }

  private prepareActors() {
    // Place actors on stage
    this.player.draw(this.player.playerX, this.player.playerY, true);
    this.coin.randomCoin();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case 'ArrowRight':
        this.player.moveRight();
        break;
      case 'ArrowLeft':
        this.player.moveLeft();

        break;
      case 'ArrowUp':
        this.player.moveUp();

        break;
      case 'ArrowDown':
        this.player.moveDown();
        break;
    }

    this.checkCollision();

    this.coin.repaintCoin();
  }

  private checkCollision() {
    
    if(this.player.checkCollision(this.coin.getPosition())) {
      this.coin.die();
      this.player.grow();
    }
  }
}
