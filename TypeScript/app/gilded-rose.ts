// For the exercice i put all the code into the same file, but normally i would split them into different files

export interface ItemUpdateStrategy {
  updateQuality(item: Item): void;
}

export abstract class BaseItemStrategy implements ItemUpdateStrategy {
  protected static readonly MIN_QUALITY = 0;
  protected static readonly MAX_QUALITY = 50;

  protected decreaseQuality(item: Item, amount: number = 1): void {
    item.quality = Math.max(BaseItemStrategy.MIN_QUALITY, item.quality - amount);
  }

  protected increaseQuality(item: Item, amount: number = 1): void {
    item.quality = Math.min(BaseItemStrategy.MAX_QUALITY, item.quality + amount);
  }

  protected updateSellIn(item: Item): void {
    item.sellIn--;
  }

  abstract updateQuality(item: Item): void;
}

export class StandardItemStrategy extends BaseItemStrategy {
  updateQuality(item: Item): void {
    const degradeAmount = item.sellIn <= 0 ? 2 : 1;
    this.decreaseQuality(item, degradeAmount);
    this.updateSellIn(item);
  }
}

export class AgedBrieStrategy extends BaseItemStrategy {
  updateQuality(item: Item): void {
    this.increaseQuality(item);
    this.updateSellIn(item);
    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }
}

export class BackstagePassStrategy extends BaseItemStrategy {
  updateQuality(item: Item): void {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      this.increaseQuality(item);
      if (item.sellIn <= 10) this.increaseQuality(item);
      if (item.sellIn <= 5) this.increaseQuality(item);
    }
    this.updateSellIn(item);
  }
}

export class SulfurasStrategy implements ItemUpdateStrategy {
  private static readonly SULFURAS_QUALITY = 80;

  updateQuality(item: Item): void {
    item.quality = SulfurasStrategy.SULFURAS_QUALITY;
  }
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // Rest of the original code remains the same
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
