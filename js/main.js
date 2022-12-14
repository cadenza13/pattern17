'use strict';

(() =>{
  class User{
    constructor(){
      this.field = document.querySelector('.user');
      this.clearCard = document.querySelector('.user > div');
      this.ids = [];
      this.cardLength = 0;
      this.lank = 0;
      this.maxNumber = 0;
    }

    create(id){
      if(this.cardLength === 0){
        this.clearCard.classList.add('hidden');
      }

      const card = document.createElement('img');
      const cardWidth = deck.card.getBoundingClientRect().width;
      const cardHeight = deck.card.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;
      const x = (cardWidth / 2) * this.cardLength;
      const y = (containerHeight - cardHeight) / 2;
      
      card.src = `img/card${id}.png`;
      this.field.appendChild(card);
      this.cardLength++;
      this.ids.push(id);

      card.style.transform = `translate(-${x}px, -${y}px)`;

      setTimeout(() =>{
        card.style.transform = 'none';
      }, 100);

      if(other.changeSwitch){
        if(this.cardLength < 5){
          setTimeout(() =>{
            deck.allo('user');
          }, 750);
        }

        if(this.cardLength === 5){
          setTimeout(() =>{
            hand.convert(this.ids);
          }, 1000);
        }

        return;
      } 
      
      if(this.cardLength <= 5){
        setTimeout(() =>{
          deck.allo('dealer');
        }, 500);
      }
    }

    cardDelete(index){
      this.cardLength--;
      delete(this.ids[index]);

      if(this.cardLength === 0){
        this.clearCard.classList.remove('hidden');
      }
    }

    idsUpdate(){
      const updateIds = this.ids.filter(id => id !== undefined);
      this.ids = [];
      this.ids = updateIds.filter(id => id !== undefined);

      deck.allo('user');
    }

    lankSet(num, max){
      this.lank = num;
      this.maxNumber = max;
    }
  }

  class Dealer{
    constructor(){
      this.field = document.querySelector('.dealer');
      this.clearCard = document.querySelector('.dealer > div');
      this.ids = [];
      this.cardLength = 0;
      this.lank = 0;
      this.maxNumber = 0;
      this.dealerDeleteSwitch = false;
      this.dealerDrawSwitch = false;
    }

    create(id){
      if(this.cardLength === 0){
        this.clearCard.classList.add('hidden');
      }

      const card = document.createElement('img');
      const cardWidth = deck.card.getBoundingClientRect().width;
      const cardHeight = deck.card.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;
      const x = (cardWidth / 2) * this.cardLength;
      const y = (containerHeight - cardHeight) / 2;

      card.src = 'img/card-inside.png';
      this.field.appendChild(card);
      this.cardLength++;
      this.ids.push(id);

      card.style.transform = `translate(-${x}px, ${y}px)`;

      setTimeout(() =>{
        card.style.transform = 'none';
      }, 100);

      if(this.dealerDrawSwitch){
        if(this.cardLength < 5){
          setTimeout(() =>{
            deck.allo('dealer');
          }, 750);
        }

        if(this.cardLength === 5){
          setTimeout(() =>{
            hand.convert(this.ids);
          }, 1000);
        }

        return;
      } 

      if(this.cardLength < 5){
        setTimeout(() =>{
          deck.allo('user');
        }, 500);
      } else if(this.cardLength === 5){
        setTimeout(() =>{
          hand.convert(user.ids);
        }, 2000);
      }
    }

    action(){
      if(this.lank >= 4){
        this.open();
        return;
      }

      this.dealerDeleteSwitch = true;
      hand.convert(dealer.ids);
    }

    draw(numbers){
      const cards = document.querySelectorAll('.dealer > img');
      const numberUnMatch = numbers.filter(num => numbers.indexOf(num) === numbers.lastIndexOf(num));

      numberUnMatch.forEach(num =>{
        const index = numbers.indexOf(num);

        cards[index].classList.add('delete');
        cards[index].style.transform = 'translateY(50px)';

        this.idDelete(index);
      });

      setTimeout(() =>{
        cards.forEach(card =>{
          if(card.classList.contains('delete')){
            card.remove();
          }
        });

        if(this.cardLength === 0){
          this.clearCard.classList.remove('hidden');
        }
      }, 1000);

      setTimeout(() =>{
        this.dealerDeleteSwitch = false;
        this.dealerDrawSwitch = true;
        this.idsUpdate();
      }, 1100);
    }

    open(){
      const cards = document.querySelectorAll('.dealer > img');
      
      cards.forEach((card, index) =>{
        card.classList.add('open');
        card.style.transform = 'scaleX(0)';
        
        setTimeout(() =>{
          card.src = `img/card${this.ids[index]}.png`;
          card.style.transform = 'none';
        }, 1000);
      });

      setTimeout(() => {
        other.result();
      }, 3000);
    }

    idDelete(index){
      this.cardLength--;
      delete(this.ids[index]);
    }

    idsUpdate(){
      const updateIds = this.ids.filter(id => id !== undefined);
      this.ids = [];
      this.ids = updateIds.filter(id => id !== undefined);

      deck.allo('dealer');
    }

    lankSet(num, max){
      this.lank = num;
      this.maxNumber = max;
    }
  }

  class Deck{
    constructor(){
      this.field = document.querySelector('.deck');
      this.card = document.getElementById('card');
      this.ids = [];
      this.total = 52;
      this.redo = false;
    }

    allo(player){
      const id = Math.floor(Math.random() * this.total);

      this.ids.forEach(num =>{
        if(num === id){
          this.redo = true;
        }
      });

      if(this.redo){
        this.redo = false;
        this.allo(player);
        return;
      }

      this.ids.push(id);

      if(player === 'user'){
        user.create(id);
      } else {
        dealer.create(id);
      }
    }
  }

  class Hand{
    constructor(){
      this.hands = [
        {handName: '????????????', value: '????????????????????????'},
        {handName: '????????????', value: '???????????????2???'},
        {handName: '????????????', value: '2??????????????????2???'},
        {handName: '??????????????????', value: '???????????????3???'},
        {handName: '???????????????', value: '?????????????????????????????????'},
        {handName: '???????????????', value: '5???????????????????????????'},
        {handName: '???????????????', value: '???????????????3??????2????????????????????????'},
        {handName: '??????????????????', value: '???????????????4???'},
        {handName: '??????????????????????????????', value: '??????????????????5???????????????????????????'},
        {handName: '??????????????????????????????????????????', value: '???10,J,Q,K,A??????????????????????????????'},
      ];

      this.currentMax = 0;
    }

    convert(ids){
      const numbers = [];
      const marks = [];

      ids.forEach(id =>{
        let num = Math.floor(id / 4);
        if(num === 0) num = 13;
        numbers.push(num);

        const mark = id % 4;
        marks.push(mark);
      });

      if(dealer.dealerDeleteSwitch){
        dealer.draw(numbers);
        return;
      }

      this.decision(numbers, marks);
    }

    decision(numbers, marks){
      const numberMatch = numbers.filter(num  => numbers.indexOf(num) !== numbers.lastIndexOf(num));
      const markMatch = Array.from(new Set(marks));
      this.currentMax = Math.max(...numberMatch);

      if(markMatch.length === 1){
        const maxNumber = Math.max(...numbers);
        const minNumber = Math.min(...numbers);
        this.currentMax = maxNumber;

        if(maxNumber === 13 && minNumber === 9){
          this.branch(9); // ??????????????????????????????????????????
        } else if(maxNumber === minNumber + 4){
          this.branch(8); // ??????????????????????????????
        } else {
          if(maxNumber === 13 && minNumber === 1){
            const ace = numbers.indexOf(13);
            numbers.splice(ace, 1, 0);
  
            const newMaxNumber = Math.max(...numbers);
            const newMinNumber = Math.min(...numbers);
  
            if(newMaxNumber === newMinNumber + 4){
              this.currentMax = newMaxNumber;
              this.branch(8); // ?????????????????????????????? [A,2,3,4,5]
            } else {
              this.branch(5); // ???????????????
            }
          } else {
            this.branch(5); // ???????????????
          }
        }
      } else if(numberMatch.length === 4){
        numberMatch.pop();
        const newNumberMatch = numberMatch.filter(num  => numberMatch.indexOf(num) !== numberMatch.lastIndexOf(num));

        if(newNumberMatch.length === 3){
          this.branch(7); // ??????????????????
        } else {
          this.branch(2); // ????????????
        }
      } else if(numberMatch.length === 5){
        this.branch(6); // ???????????????
      } else if(numberMatch.length === 3){
        this.branch(3); // ??????????????????
      } else if(numberMatch.length === 2){
        this.branch(1); // ????????????
      } else {
        const maxNumber = Math.max(...numbers);
        const minNumber = Math.min(...numbers);
        this.currentMax = maxNumber;

        if(maxNumber === minNumber + 4){
          this.branch(4); // ???????????????
        } else {
          if(maxNumber === 13 && minNumber === 1){
            const ace = numbers.indexOf(13);
            numbers.splice(ace, 1, 0);
  
            const newMaxNumber = Math.max(...numbers);
            const newMinNumber = Math.min(...numbers);
  
            if(newMaxNumber === newMinNumber + 4){
              this.currentMax = newMaxNumber;
              this.branch(4); // ??????????????? [A,2,3,4,5]
            } else {
              this.branch(0); // ????????????
            }
          } else {
            this.branch(0); // ????????????
          }
        }
      }
    }

    branch(num){
      if(other.checkSwitch){
        dealer.lankSet(num, this.currentMax);

        if(dealer.dealerDrawSwitch){
          setTimeout(() =>{
            dealer.open();
          }, 500);
        } else {
          dealer.action();
        }

        return;
      }

      user.lankSet(num, this.currentMax);

      if(other.changeSwitch){
        other.dealerTurn();
      } else {
        other.action(this.hands[num].handName);
      }
    }
  }

  class Other{
    constructor(){
      this.btns = document.querySelector('.action-btns');
      this.drawBtn = document.getElementById('draw-btn');
      this.checkBtn = document.getElementById('check-btn');
      this.text = document.querySelector('.text');
      this.textP = document.getElementById('text-p');
      this.textBtn = document.getElementById('text-btn');
      this.changeBtn = document.getElementById('change-btn');
      this.changeSwitch = false;
      this.checkSwitch = false;

      this.drawBtn.addEventListener('click', () =>{
        this.text.classList.add('hidden');
        this.changeBtn.classList.remove('hidden');

        this.selected();
      });

      this.checkBtn.addEventListener('click', () =>{
        this.text.classList.add('hidden');
        this.dealerTurn();
      });

      this.changeBtn.addEventListener('click', () =>{
        if(this.changeBtn.classList.contains('none')){
          return;
        }
        this.changeSwitch = true;
        this.changeBtn.classList.add('hidden');

        const userCards = document.querySelectorAll('.user > img');
        userCards.forEach((card, index) =>{
          if(card.classList.contains('select')){
            card.classList.add('delete');
            card.style.transform = 'translateY(50px)';

            setTimeout(() =>{
              card.remove();
              user.cardDelete(index);
            }, 1000);
          }
        });
        
        setTimeout(() =>{
          user.idsUpdate();
        }, 1100);
      });

      this.textBtn.addEventListener('click', () =>{
        location.href = 'index.html';
      });
    }

    action(handName){
      this.text.classList.remove('hidden');
      this.textP.innerText = `??????????????????${handName}????????????\n????????????????????? -> ?????????\n??????????????????????????? -> ????????????`;
    }

    selected(){
      const userCards = document.querySelectorAll('.user > img');
      userCards.forEach(card =>{
        card.addEventListener('click', () =>{
          if(this.changeBtn.classList.contains('hidden')){
            return;
          }
          card.classList.toggle('select');

          this.selectCheck();
        });
      });
    }

    selectCheck(){
      this.changeBtn.classList.add('none');

      const userCards = document.querySelectorAll('.user > img');
      userCards.forEach(card =>{
        if(card.classList.contains('select')){
          this.changeBtn.classList.remove('none');
        }
      });
    }

    dealerTurn(){
      this.checkSwitch = true;

      setTimeout(() => {
        hand.convert(dealer.ids);
      }, 500);
    }

    result(){
      this.btns.classList.add('hidden');
      this.text.classList.remove('hidden');
      this.textBtn.classList.remove('hidden');

      if(user.lank > dealer.lank){
        this.textP.innerText = `??????????????????${hand.hands[user.lank].handName}???\n??????????????????${hand.hands[dealer.lank].handName}???\n \n????????????????????????!`;
      } else if(user.lank < dealer.lank){
        this.textP.innerText = `??????????????????${hand.hands[user.lank].handName}???\n??????????????????${hand.hands[dealer.lank].handName}???\n \n??????????????????????????????!`;
      } else {
        if(user.lank === 0){
          this.textP.innerText = `???????????????${hand.hands[user.lank].handName}????????????!\n \n???????????????????????????????????????????????????!`
        } else if(user.maxNumber > dealer.maxNumber){
          this.textP.innerText = `???????????????${hand.hands[user.lank].handName}????????????!\n \n????????????????????????????????????????????????????????????!`;
        } else if(user.maxNumber < dealer.maxNumber){
          this.textP.innerText = `???????????????${hand.hands[user.lank].handName}????????????!\n \n??????????????????????????????????????????????????????????????????!`;
        } else {
          this.textP.innerText = `???????????????${hand.hands[user.lank].handName}????????????!\n \n??????????????????????????????????????????????????????!`;
        }
      }
    }
  }

  const title = document.querySelector('.title');
  const container = document.querySelector('.container');
  const startBtn = document.getElementById('start-btn');
  
  const user = new User();
  const dealer = new Dealer();
  const deck = new Deck();
  const hand = new Hand();
  const other = new Other();

  for(let i = 0; i < 52; i++){
    const preload = document.createElement('img');
    preload.src = `img/card${i}.png`;
  }

  startBtn.addEventListener('click', () =>{
    title.classList.add('hidden');
    container.classList.remove('hidden');

    setTimeout(() =>{
      deck.allo('user');
    }, 500);
  });
})();