//Player Register Class

class Player {
    constructor(firstname, lastname, car, email, phonenumber) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.car = car;
      this.email = email;
      this.phonenumber = phonenumber;
    }
  }
  
  //User Interface Class
  class Interface {
    static displayPlayers() {
      const RegisteredPlayers = Storage.getPlayers();
  
      const players = RegisteredPlayers;
  
      players.forEach(player => Interface.addPlayers(player));
    }
  
    static addPlayers(player) {
      const playerList = document.querySelector('#playerlist');
  
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${player.firstname}</td>
      <td>${player.lastname}</td>
      <td>${player.car}</td>
      <td>${player.email}</td>
      <td>${player.phonenumber}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      playerList.appendChild(row);
    }
  
    static deletePlayer(el) {
      if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static clearFormField() {
      document.getElementById('firstname').value = '';
      document.getElementById('lastname').value = '';
      document.getElementById('car').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
    }
  }
  
  //Handles the local storage in the UI
  class Storage {
    static getPlayers() {
      let players;
      if (localStorage.getItem('players') === null) {
        players = [];
      } else {
        players = JSON.parse(localStorage.getItem('players'));
      }
  
      return players;
    }
  
    static addClubPlayer(player) {
      const players = Storage.getPlayers();
      players.push(player);
      localStorage.setItem('players', JSON.stringify(players));
    }
  
    static removeClubPlayer(phonenumber) {
      const players = Storage.getPlayers();
  
      players.forEach((player, index) => {
        if (player.phonenumber === phonenumber) {
          players.splice(index, 1);
        }
      });
  
      localStorage.setItem('players', JSON.stringify(players));
    }
  }
  
  //Event to Display players
  
  document.addEventListener('DOMContentLoaded', Interface.displayPlayers);
  
  //Register A New Player
  
  document.querySelector('#player-form').addEventListener('submit', e => {
    //Prevent Default Submission
    e.preventDefault();
  
    //Get The Values of The Form
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const car = document.querySelector('#car').value;
    const email = document.querySelector('#email').value;
    const phonenumber = document.querySelector('#phone').value;
  
    //Instantiate Player Register Class
  
    const player = new Player(
      firstname,
      lastname,
      car,
      email,
      phonenumber
    );
  
    //Register a New Player in User Interface
    Interface.addPlayers(player);
    //Add Player to storage
    Storage.addClubPlayer(player);
  
    //Clear Form Field
    Interface.clearFormField();
  });
  
  document.querySelector('#playerlist').addEventListener('click', e => {
    //Remove Player from UI
    Interface.deletePlayer(e.target);
  
    //Remove Player from storage
    Storage.removeClubPlayer(
      e.target.parentElement.previousElementSibling.textContent
    );
  });