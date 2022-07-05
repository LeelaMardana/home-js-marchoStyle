"use strict";

const namee = document.querySelector(".input-name");
const lastName = document.querySelector(".input-lastname");
const ageInput = document.querySelector(".main-range__item input");
const ageValue = document.querySelector(".main-range__item span");
const btnSave = document.querySelector(".btn-save");
const gender = document.querySelectorAll(".main-gender__label");
const genderInput = document.querySelectorAll(".main-gender__input");
const children = document.querySelector(".main-children__input");
const languageInput = document.querySelector(".main-language__set-input");
const languageAdd = document.querySelector(".main-language__set-btn");
const selectDestiny = document.querySelector("[name=destiny__select]");
const atheist = document.querySelector(".atheist");
const position = document.querySelector(".atheist-interview__input");
const education = document.querySelector(".atheist-education__input");
const skillInput = document.querySelector(".atheist-skills__set-input");
const skillAdd = document.querySelector(".atheist-skills__set-btn");
const cristian = document.querySelector(".cristian");
const sinInput = document.querySelector(".cristian-sins__set-input");
const sinAdd = document.querySelector(".cristian-sins__set-btn");
const blessing = document.querySelector(".cristian-blessed__input");
const zadrot = document.querySelector(".zadrot");
const hero = document.querySelector("[name=zadrot-class__select]");
const fraction = document.querySelector("[name=zadrot-fraction__select]");
const list = document.querySelector(".data__items");

//ls19
const interactiveTime = () => {
  const goodDay = document.querySelectorAll(".ls19__text")[0];
  const today = document.querySelectorAll(".ls19__text")[1];
  const timeNow = document.querySelectorAll(".ls19__text")[2];
  const daysLeft = document.querySelectorAll(".ls19__text")[3];

  let date = new Date();
  let weekDay = date.getDay();
  let time = date.getHours();
  let amPm = date.toLocaleString({ hour12: true }).slice(10).trim();

  const setGreeting = () => {
    if (time >= 5 && time < 12) {
      return "Доброе утро";
    } else if (time >= 12 && time < 18) {
      return "Добрый день";
    } else if (time >= 18 && time < 24) {
      return "Добрый вечер";
    } else if (time >= 0 && time < 5) {
      return "Доброй ночи";
    } else {
      return "Приветствуем вас";
    }
  };
  const setWeekDay = () => {
    switch (weekDay) {
      case 0:
        return "Воскресенье";
      case 1:
        return "Понедельник";
      case 2:
        return "Вторник";
      case 3:
        return "Среда";
      case 4:
        return "Четверг";
      case 5:
        return "Пятница";
      case 6:
        return "Суббота";
    }
  };
  const getDaysLeft = () => {
    let dateNow = date.getTime();
    let year = date.getFullYear();
    let dateStop = new Date(`1 January ${year + 1}`).getTime();
    let timeRemaining = (dateStop - dateNow) / 1000;
    let sec = Math.floor(timeRemaining % 60);
    let min = Math.floor((timeRemaining / 60) % 60);
    let hours = Math.floor((timeRemaining / 60 / 60) % 24);
    let days = Math.floor(timeRemaining / 60 / 60 / 24);

    return `${days} дней, ${hours} часов, ${min} минут, ${sec} секунд`;
  };

  goodDay.textContent = setGreeting();
  today.textContent = "Сегодня: " + setWeekDay();
  timeNow.textContent = "Текущее время: " + amPm;
  daysLeft.textContent = "До нового года осталось: " + getDaysLeft();
  setTimeout(interactiveTime, 1000);
};
interactiveTime();

let destinyValue = "";

const firstWord = (word) => {
  return word.trim()[0].toUpperCase() + word.trim().substring(1).toLowerCase();
};

const isNumber = (num) => {
  return !isNaN(parseFloat(num) && isFinite(num));
};

class Man {
  constructor({ age, children, languages = [], sex, name, lastName, destiny }) {
    this.age = age;
    this.children = children;
    this._languages = languages;
    this.name = name;
    this.sex = sex;
    this.lastName = lastName;
    this.destiny = destiny;
  }

  get languages() {
    return this._languages;
  }

  set languages(str) {
    this.languages.push(str);
  }
}

class Atheist extends Man {
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
    destiny,
  }) {
    super({ age, children, languages, sex, name, lastName, destiny });
    this.education = education;
    this._skills = skills;
    this.position = position;
  }

  get skills() {
    return this._skills;
  }

  set skills(str) {
    this.skills.push(str);
  }
}

class Cristian extends Man {
  constructor({
    age,
    children,
    languages,
    sex,
    name,
    lastName,
    blessing,
    sins = [],
    destiny,
  }) {
    super({ age, children, languages, sex, name, lastName, destiny });
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

class Zadrot extends Man {
  constructor({
    age,
    children,
    languages,
    sex,
    name,
    lastName,
    hero,
    fraction,
    destiny,
  }) {
    super({ age, children, languages, sex, name, lastName, destiny });
    this.hero = hero;
    this.fraction = fraction;
  }
}

const appData = {
  people: [],
  isError: false,

  init() {
    this.getAge(); // меняем возраст сразу

    btnSave.addEventListener("click", (e) => {
      e.preventDefault();
      this.checkValues();
    });
    this.addLanguage();
    this.addSkills();
    this.addSins();

    selectDestiny.addEventListener("change", () => {
      destinyValue = selectDestiny.options[selectDestiny.selectedIndex].value;
      const array = [cristian, atheist, zadrot];

      array.forEach((item) => item.classList.remove("active"));
      if (destinyValue !== "") eval(destinyValue).classList.add("active");
    });

    this.people = JSON.parse(localStorage.getItem("note")) || [];
    this.render();
  },

  addLanguage() {
    languageInput.addEventListener("input", () => {
      if (languageInput.value.trim() === "") {
        languageAdd.disabled = true;
      } else {
        languageAdd.disabled = false;
      }
    });

    languageAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = document.querySelector(".main-language__items");
      const newLanguage = document.createElement("div");

      newLanguage.classList.add("main-language__item");
      newLanguage.innerHTML = `<input class="main-language__item-input" type="text" disabled
      value="${firstWord(languageInput.value)}"> 
      <button class="main-language__item-btn">remove</button>`;
      parent.append(newLanguage);
      languageInput.value = "";
      languageAdd.disabled = true;

      //После создания тут же собираем все в НОД
      const languageRemove = document.querySelectorAll(
        ".main-language__item-btn"
      );
      // перебираем и следим за каждой кнопкой. При нажатии на которую удалит своего родителя
      languageRemove.forEach((btn) => {
        btn.addEventListener("click", () => btn.parentNode.remove());
      });
    });
  },

  addSkills() {
    const skillInput = document.querySelector(".atheist-skills__set-input");
    const skillAdd = document.querySelector(".atheist-skills__set-btn");
    //delete upper

    skillInput.addEventListener("input", () => {
      if (skillInput.value.trim() === "") {
        skillAdd.disabled = true;
      } else {
        skillAdd.disabled = false;
      }
    });

    skillAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = document.querySelector(".atheist-skills__items");
      const newSkill = document.createElement("div");

      newSkill.classList.add("atheist-skills__item");
      newSkill.innerHTML = `<input class="atheist-skills__item-input" type="text" disabled
      value="${skillInput.value.toLowerCase()}"> 
      <button class="atheist-skills__item-btn">remove</button>`;
      parent.append(newSkill);
      skillInput.value = "";
      skillAdd.disabled = true;

      //После создания тут же собираем все в НОД
      const skillRemove = document.querySelectorAll(
        ".atheist-skills__item-btn"
      );
      // перебираем и следим за каждой кнопкой. При нажатии на которую удалит своего родителя
      skillRemove.forEach((btn) => {
        btn.addEventListener("click", () => btn.parentNode.remove());
      });
    });
  },

  addSins() {
    sinInput.addEventListener("input", () => {
      if (sinInput.value.trim() === "") {
        sinAdd.disabled = true;
      } else {
        sinAdd.disabled = false;
      }
    });

    sinAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = document.querySelector(".cristian-sins__items");
      const newSin = document.createElement("div");

      newSin.classList.add("cristian-sins__item");
      newSin.innerHTML = `<input class="cristian-sins__item-input" type="text" disabled
      value="${sinInput.value.toLowerCase()}"> 
      <button class="cristian-sins__item-btn">remove</button>`;
      parent.append(newSin);
      sinInput.value = "";
      sinAdd.disabled = true;

      //После создания тут же собираем все в НОД
      const sinRemove = document.querySelectorAll(".cristian-sins__item-btn");
      // перебираем и следим за каждой кнопкой. При нажатии на которую удалит своего родителя
      sinRemove.forEach((btn) => {
        btn.addEventListener("click", () => btn.parentNode.remove());
      });
    });
  },

  getAge() {
    ageInput.addEventListener(
      "input",
      () => (ageValue.textContent = `${ageInput.value} yers old`)
    );
  },

  checkValues() {
    this.isError = false;
    const languageItem = document.querySelectorAll(".main-language__item");
    const array = [namee.value, lastName.value, destinyValue];

    const atheistValues = () => {
      const skillItem = document.querySelectorAll(".atheist-skills__item");
      if (skillItem.length === 0 || education.value.trim() === "") {
        this.isError = true;
      }
    };

    const cristValues = () => {
      const sinItem = document.querySelectorAll(".cristian-sins__item");
      if (sinItem.length === 0) {
        this.isError = true;
      }
    };
    const zadrotValues = () => {
      const selectedHero = hero.options[hero.selectedIndex].value;
      const selectedFraction = fraction.options[fraction.selectedIndex].value;

      if (selectedHero === "" || selectedFraction === "") {
        this.isError = true;
      }
    };

    array.forEach((input) => {
      if (input.trim() === "" || isNumber(input)) {
        this.isError = true;
      }
    });

    if (genderInput[0].checked === false && genderInput[1].checked === false) {
      this.isError = true;
    }

    if (languageItem.length === 0) {
      this.isError = true;
    }

    if (destinyValue === "atheist") {
      atheistValues();
    } else if (destinyValue === "cristian") {
      cristValues();
    } else if (destinyValue === "zadrot") {
      zadrotValues();
    }

    if (!this.isError) {
      this.start();
    } else {
      alert("Заполните все поля корректно");
    }
  },

  getChoce() {
    if (destinyValue === "atheist") {
      this.createAtheist();
    } else if (destinyValue === "cristian") {
      this.createCristian();
    } else if (destinyValue === "zadrot") {
      this.createZadrot();
    }
    location.reload();
  },
  createAtheist() {
    const user = new Atheist({
      name: firstWord(namee.value),
      lastName: firstWord(lastName.value),
      age: +ageInput.value,
      children: children.checked ? "yes" : "no",
      position: position.checked ? "yes" : "no",
      education: firstWord(education.value),
      destiny: firstWord(
        selectDestiny.options[selectDestiny.selectedIndex].value
      ),
    });

    const getGender = () => {
      gender.forEach((item) => {
        const input = item.querySelector("input");
        const text = item.querySelector("div span");

        if (input.checked === true) {
          user.sex = text.textContent;
        }
      });
    };

    const getLanguage = () => {
      const languageName = document.querySelectorAll(
        ".main-language__item-input"
      );

      languageName.forEach((input) => {
        user.languages = input.value;
      });
    };

    const getSkills = () => {
      const skillName = document.querySelectorAll(
        ".atheist-skills__item-input"
      );

      skillName.forEach((input) => {
        user.skills = input.value;
      });
    };

    getGender();
    getLanguage();
    getSkills();
    this.people.push(user);
  },
  createCristian() {
    const user = new Cristian({
      name: firstWord(namee.value),
      lastName: firstWord(lastName.value),
      age: +ageInput.value,
      children: children.checked ? "yes" : "no",
      blessing: blessing.checked ? "yes" : "no",
      destiny: firstWord(
        selectDestiny.options[selectDestiny.selectedIndex].value
      ),
    });

    const getGender = () => {
      gender.forEach((item) => {
        const input = item.querySelector("input");
        const text = item.querySelector("div span");

        if (input.checked === true) {
          user.sex = text.textContent;
        }
      });
    };

    const getLanguage = () => {
      const languageName = document.querySelectorAll(
        ".main-language__item-input"
      );

      languageName.forEach((input) => {
        user.languages = input.value;
      });
    };

    const getSins = () => {
      const sinName = document.querySelectorAll(".cristian-sins__item-input");
      sinName.forEach((input) => {
        user.sins = input.value;
      });
    };

    getGender();
    getLanguage();
    getSins();
    this.people.push(user);
  },
  createZadrot() {
    const user = new Zadrot({
      name: firstWord(namee.value),
      lastName: firstWord(lastName.value),
      age: +ageInput.value,
      children: children.checked ? "yes" : "no",
      destiny: firstWord(
        selectDestiny.options[selectDestiny.selectedIndex].value
      ),
    });

    const getGender = () => {
      gender.forEach((item) => {
        const input = item.querySelector("input");
        const text = item.querySelector("div span");

        if (input.checked === true) {
          user.sex = text.textContent;
        }
      });
    };

    const getLanguage = () => {
      const languageName = document.querySelectorAll(
        ".main-language__item-input"
      );

      languageName.forEach((input) => {
        user.languages = input.value;
      });
    };

    const getSelected = () => {
      user.hero = hero.options[hero.selectedIndex].value;
      user.fraction = fraction.options[fraction.selectedIndex].value;
    };

    getGender();
    getLanguage();
    getSelected();
    this.people.push(user);
  },

  render() {
    localStorage.setItem("note", JSON.stringify(this.people));

    list.innerHTML = "";
    this.people.forEach((person, index) => {
      const item = document.createElement("div");

      let text;
      const textAtheist = () => {
        return `<li class="data-item__wrap data-interview">
                          <span class="data-item__name">Interview:</span>
                          <span class="data-item__value">${
                            person.position
                          }</span>
                        </li>
                        <li class="data-item__wrap data-education">
                          <span class="data-item__name">Education:</span>
                          <span class="data-item__value">${
                            person.education
                          }</span>
                        </li>
                        <li class="data-item__wrap data-skills">
                          <span class="data-item__name">Skills:</span>
                          <span class="data-item__value">${person._skills.join(
                            ", "
                          )}</span>
                        </li>`;
      };
      const textCrist = () => {
        return `<li class="data-item__wrap data-sins">
                          <span class="data-item__name">Sins:</span>
                          <span class="data-item__value">${person._sins.join(
                            ", "
                          )}</span>
                        </li>
                        <li class="data-item__wrap data-blessing">
                          <span class="data-item__name">Blessed:</span>
                          <span class="data-item__value">${
                            person.blessing
                          }</span>
                        </li>`;
      };
      const textZadrot = () => {
        return `<li class="data-item__wrap data-fraction">
                          <span class="data-item__name">Fraction:</span>
                          <span class="data-item__value">${person.fraction}</span>
                        </li>
                        <li class="data-item__wrap data-class">
                          <span class="data-item__name">Class:</span>
                          <span class="data-item__value">${person.hero}</span>
                        </li>`;
      };

      if (person.destiny === "Atheist") {
        text = textAtheist();
      } else if (person.destiny === "Cristian") {
        text = textCrist();
      } else if (person.destiny === "Zadrot") {
        text = textZadrot();
      }

      item.classList.add("data-item");
      item.innerHTML = `<h4 class="data-item__title">${person.name} - ${
        person.destiny
      }</h4>
                    <ul class="data-item__list">
                      <li class="data-item__wrap data-name">
                        <span class="data-item__name">Name:</span>
                        <span class="data-item__value">${person.name}</span>
                      </li>
                      <li class="data-item__wrap data-lastname">
                        <span class="data-item__name">Lastname:</span>
                        <span class="data-item__value">${person.lastName}</span>
                      </li>
                      <li class="data-item__wrap data-age">
                        <span class="data-item__name">Age:</span>
                        <span class="data-item__value">${person.age}</span>
                      </li>
                      <li class="data-item__wrap data-gender">
                        <span class="data-item__name">Gender:</span>
                        <span class="data-item__value">${person.sex}</span>
                      </li>
                      <li class="data-item__wrap data-children">
                        <span class="data-item__name">Children:</span>
                        <span class="data-item__value">${person.children}</span>
                      </li>
                      <li class="data-item__wrap data-language">
                        <span class="data-item__name">Languange:</span>
                        <span class="data-item__value">
                          ${person._languages.join(", ")}
                        </span>
                      </li>
                      <li class="data-item__wrap data-destiny">
                        <span class="data-item__name">Destiny:</span>
                        <span class="data-item__value">${person.destiny}</span>
                      </li>${text}
                        <button class="data-item__btn" type="button">
                          Delete Person
                        </button>
                    </ul>`;
      list.prepend(item);
      item.querySelector(".data-item__btn").addEventListener("click", () => {
        this.people.splice(index, 1);
        this.render();
      });
    });
  },

  start() {
    this.getChoce();
    this.render();
  },
};

appData.init();
