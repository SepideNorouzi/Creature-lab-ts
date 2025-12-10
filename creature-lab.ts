enum CreatureState {
  BABY = "baby",
  NORMAL = "normal",
  EVOLVED = "evolved",
}
enum CreatureType {
  FIRE = "fire",
  WATER = "water",
  EARTH = "earth",
}

type Stats = {
  attack: number;
  defense: number;
  speed: number;
};

interface ICreature {
  name: string;
  id: number;
  state: CreatureState;
  type: CreatureType;
  stats: Stats;

  evolve(): void;
  describe(): void;
}

abstract class CreatureBase implements ICreature {
  name: string;
  id: number;
  state: CreatureState;
  type: CreatureType;
  stats: Stats;
  constructor(id: number, name: string, type: CreatureType) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.state = CreatureState.BABY;
    this.stats = { attack: 1, defense: 1, speed: 1 };
  }
  describe(): void {
    console.log(
      `
${this.name} (${this.type}) [${this.state}] -> \nattack:${this.stats.attack}  \ndefense:${this.stats.defense}  \nspeed:${this.stats.speed}
      `
    );
  }
  abstract evolve(): void;
  //
}

class FireCreature extends CreatureBase {
  evolve(): void {
    this.state = CreatureState.EVOLVED;
    this.stats.attack += 5;
    this.stats.speed += 2;
    console.log(`${this.name} evolved into a blazing form 🔥`);
  }
}
class WaterCreature extends CreatureBase {
  evolve(): void {
    this.state = CreatureState.EVOLVED;
    this.stats.defense += 5;
    this.stats.speed += 1;
    console.log(`${this.name} evolved into a flowing guardian 💧`);
  }
}

class CreatureController {
  private creatures: CreatureBase[] = [];
  private latestID = 0;

  create(name: string, type: CreatureType) {
    this.latestID++;
    let creature: CreatureBase;

    if (type === CreatureType.FIRE) {
      creature = new FireCreature(this.latestID, name, type);
    } else if (type === CreatureType.WATER) {
      creature = new WaterCreature(this.latestID, name, type);
    } else {
      creature = new FireCreature(this.latestID, name, type);
    }

    this.creatures.push(creature);
    return creature;
  }

  list() {
    this.creatures.forEach((c) => c.describe());
  }
  getById(id: number) {
    return this.creatures.find((c) => c.id === id);
  }
  delete(id: number) {
    this.creatures = this.creatures.filter((c) => c.id !== id);
  }
}

const manager = new CreatureController();

const pyro = manager.create("Pyro", CreatureType.FIRE);
const aqua = manager.create("Aqua", CreatureType.WATER);
manager.list();

pyro.evolve();
aqua.evolve();
manager.list();
