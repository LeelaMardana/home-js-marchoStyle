"use strict";

const firstWord = (word) => {
  return word.trim()[0].toUpperCase() + word.trim().substring(1).toLowerCase();
};

class Man {
  constructor(age, children, languages = [], sex, name, lastName) {
    this.age = age;
    this.children = children;
    this._languages = languages;
    this.sex = sex.trim().toLowerCase();
    this.name = firstWord(name);
    this.lastName = firstWord(lastName);
  }

  get languages() {
    return this._languages;
  }

  set languages(str) {
    this.languages.push(str);
  }

  speak() {
    let result;
    const isTrue = () => {
      result = this.children
        ? "I have children. Family is an important part of my life."
        : "I have no children. All I think about is career.";
    };
    isTrue();

    console.log(
      `Welcome to my strange resume. I am a ${this.sex}.\nMy name is ${
        this.name
      }, my last name is ${this.lastName}.\nI speak ${this.languages.join(
        ", "
      )}.\n${result}\nBy the way, my age is ${this.age}`
    );
  }
}

class Atheism extends Man {
  constructor({
    age,
    children,
    languages,
    sex,
    name,
    lastName,
    education,
    skills = [],
    position,
  }) {
    super(age, children, languages, sex, name, lastName);
    this.education = education.trim().toLowerCase();
    this._skills = skills;
    this.position = position;
  }

  get skills() {
    return this._skills;
  }

  set skills(str) {
    this.skills.push(str);
  }

  speak() {
    super.speak();
    let result;
    const isTrue = () => {
      result = this.position
        ? "I have already been invited for an interview."
        : "I haven't received an invitation yet.";
    };
    isTrue();

    console.log(
      `My education is ${
        this.education
      }, and I would like to work in this company.\nIn addition I can ${this.skills.join(
        ", "
      )}.\n${result}`
    );
  }
}

class Christianity extends Man {
  constructor({
    age,
    children,
    languages,
    sex,
    name,
    lastName,
    blessing,
    sins,
  }) {
    super(age, children, languages, sex, name, lastName);
    this.blessing = blessing;
    this._sins = sins;
  }

  get sins() {
    return this._sins;
  }

  set sins(str) {
    this.sins.push(str);
  }
}

class Warcrafcism extends Man {
  constructor({
    age,
    children,
    languages,
    sex,
    name,
    lastName,
    hero,
    fraction,
  }) {
    super(age, children, languages, sex, name, lastName);
    this.hero = firstWord(hero);
    this.fraction = fraction;
  }
}

const atheist = new Atheism({
  age: 165,
  children: false,
  languages: [],
  sex: "   womAn",
  name: "  lagertha     ",
  position: true,
  skills: [],
  education: "  meDICine",
  lastName: "  jenKins",
});

const cristian = new Christianity({
  age: 192,
  children: true,
  languages: [],
  sex: "   mAn",
  name: "  raGnaR     ",
  lastName: "  lodBROck  ",
  blessing: true,
  sins: [],
});

const zadrot = new Warcrafcism({
  age: 220,
  children: false,
  languages: [],
  sex: "   mAn",
  name: "  arthas     ",
  lastName: "  meNETIL  ",
  hero: "paladin",
  fraction: "Alince",
});

atheist.languages = firstWord("    english");
atheist.languages = firstWord("spaiN");
atheist.skills = " reaD".trim().toLowerCase();
atheist.skills = " wRite".trim().toLowerCase();

cristian.languages = firstWord(" frEnch");
cristian.languages = firstWord(" spirituAL");
cristian.languages = firstWord(" russian");
cristian.sins = "  kilLed A man   ".trim().toLowerCase();
cristian.sins = "   kissed A dOg".trim().toLowerCase();
cristian.sins = "   666".trim().toLowerCase();

zadrot.languages = firstWord("    english");

console.log(atheist);
console.log(cristian);
console.log(zadrot);

////////////////////////////////////////////////////////////////////////
