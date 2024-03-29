const { createApp } = Vue;
let currentTime = new Date();
let currentTimeAndDate = currentTime.toLocaleString().split(",");
let currenttime = currentTimeAndDate[1].split(":");
let currentTimimg = currenttime[0] + ":" + currenttime[1];
console.log(currentTimimg);

const dt = luxon.DateTime;

const app = createApp({
  data() {
    return {
      check: true,
      messageIndex: 0,
      searchText: "",
      newChat: {
        date: dt.now().toFormat("dd/MM/yyyy HH:mm:ss"),
        message: "",
        status: "sent",
      },
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },
  methods: {
    dateToHours: function (date) {
      const LuxonDate = dt.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
      console.log(LuxonDate);
      console.log(LuxonDate.toFormat("HH:mm"));
      return LuxonDate.toFormat("HH:mm");
    },
    checkIndex: function () {
      if (this.contacts[this.messageIndex].messages.length === 0) {
        this.messageIndex++;
      } else {
      }
    },

    changeOrder: function (index) {
      let first = this.contacts[index];
      for (let i = 0; i < this.contacts.length; i++) {
        if (index == i) {
          this.contacts.splice(index, 1);
          this.contacts.unshift(first);

          console.log(this.contacts);
        }
      }
    },

    Send: function () {
      this.contacts[this.messageIndex].messages.push({ ...this.newChat });
      this.newChat.message = "";
      let IndexActual = this.messageIndex;
      setTimeout(() => {
        this.contacts[IndexActual].messages.push({
          ...{
            date: dt.now().toFormat("dd/MM/yyyy HH:mm:ss"),
            message:
              "Il messaggio non è stato possibile inviarlo, siamo spiacenti. Riprovi più tardi",
            status: "received",
          },
        });
      }, 1000);
      this.changeOrder(IndexActual);
    },
    deleteMessage: function (chatN) {
      this.contacts[this.messageIndex].messages.splice(chatN, 1);
      // const lastMessage = document.querySelector(".message");
      // if (this.contacts[this.messageIndex].messages.length === 1) {
      //   this.contacts[this.messageIndex].visible = false;
      // }
    },

    changeChat: function (chatNumber) {
      this.messageIndex = chatNumber;
      this.contacts.forEach((element, index) => {
        element.visible = true;
      });
    },

    textSearch: function () {
      const searchWord = this.searchText.trim();
      const newWord =
        searchWord[0].toUpperCase() + searchWord.slice(1).toLowerCase();
      this.contacts.forEach((element, index) => {
        if (element.name.includes(newWord)) {
          element.visible = true;
        } else {
          element.visible = false;
        }
        console.log(newWord);
      });
    },
    createTime: function () {
      let currentTimeAndDate = currentDate.toLocaleString().split(",");
      let currentTime = currentTimeAndDate[1].split(":");
      let ActualTime = currentTime[0] + ":" + currentTime[1];
    },
  },
}).mount("#app");
