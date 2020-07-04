require("dotenv").config();
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOK);

const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
/echo - say "You said echo"
/echo <msg> - echo a message
`;

bot.use((ctx, next) => {
  if (ctx.updateSubTypes[0] == "text") {
    bot.telegram.sendMessage(
      -1001199985874,
      ctx.from.first_name + " Test ! " + ctx.message.text
    );
  } else {
    bot.telegram.sendMessage(
      -1001199985874,
      ctx.from.first_name + " Test " + ctx.updateSubTypes[0]
    );
  }
  next();
});

bot.start((ctx) => {
  ctx.reply("Привет!");
  ctx.reply(helpMessage);
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

bot.command("echo", (ctx) => {
  let input = ctx.message.text; // get input from user  //получить информацию от пользователя
  let inputArray = input.split(" "); //split input by spaces // разделить ввод пробелами
  let message = ""; // create variable for message to output to user //создать переменную для вывода сообщения пользователю
  if (inputArray.length == 1) {
    // check if array in array - "/echo" //проверить, если массив в массиве
    message = "You";
  } else {
    inputArray.shift(); //remove first element in array - "/echo" // удалить первый элемент в массиве
    message = inputArray.join(" "); // join all elements into a string separated by spaces // объединить все элементы в строку, разделенную пробелами
  }

  ctx.reply(message); //reply message to user// ответное сообщение пользователю
});

bot.launch();
