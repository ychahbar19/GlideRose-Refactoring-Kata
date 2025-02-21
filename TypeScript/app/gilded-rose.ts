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
  private static readonly instance = new StandardItemStrategy();

  private constructor() {
    super();
  }

  static getInstance(): StandardItemStrategy {
    return StandardItemStrategy.instance;
  }

  updateQuality(item: Item): void {
    const degradeAmount = item.sellIn <= 0 ? 2 : 1;
    this.decreaseQuality(item, degradeAmount);
    this.updateSellIn(item);
  }
}

class AgedBrieStrategy extends BaseItemStrategy {
  private static readonly instance = new AgedBrieStrategy();

  private constructor() {
    super();
  }

  static getInstance(): AgedBrieStrategy {
    return AgedBrieStrategy.instance;
  }

  updateQuality(item: Item): void {
    this.increaseQuality(item);
    this.updateSellIn(item);
    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }
}


class BackstagePassStrategy extends BaseItemStrategy {
  private static readonly instance = new BackstagePassStrategy();

  private constructor() {
    super();
  }

  static getInstance(): BackstagePassStrategy {
    return BackstagePassStrategy.instance;
  }

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

// does not need to extends the BaseStrategy because it does not use the base methods
class SulfurasStrategy implements ItemUpdateStrategy {
  private static readonly SULFURAS_QUALITY = 80;
  private static readonly instance = new SulfurasStrategy();

  private constructor() { }

  static getInstance(): SulfurasStrategy {
    return SulfurasStrategy.instance;
  }

  updateQuality(item: Item): void {
    item.quality = SulfurasStrategy.SULFURAS_QUALITY;
  }
}

export class ItemUpdateStrategyFactory {
  private static readonly AGED_BRIE = 'Aged Brie';
  private static readonly BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
  private static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';

  static createStrategy(item: Item): ItemUpdateStrategy {
    if (item.name === this.AGED_BRIE) return AgedBrieStrategy.getInstance();
    if (item.name === this.BACKSTAGE_PASSES) return BackstagePassStrategy.getInstance();
    if (item.name === this.SULFURAS) return SulfurasStrategy.getInstance();
    return StandardItemStrategy.getInstance();
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

  // updated updateQuality method version to call the appropriate Strategy
  updateQuality(): Array<Item> {
    this.items.forEach(item => {
      const strategy = ItemUpdateStrategyFactory.createStrategy(item);
      strategy.updateQuality(item);
    });
    return this.items;
  }
}
