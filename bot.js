const Discord = require("discord.js");

const COMMAND_PREFIX = "lain";
const COMMAND_LEAVE = "leave";
const COMMAND_DONATE = "donate";
const COMMAND_INFO = "info";
const CYBERIA_RADIO = "https://lainon.life/radio/cyberia.ogg";
const CYBERIA = "cyberia";
const SWING_RADIO = "https://lainon.life/radio/swing.ogg";
const SWING = "swing";
const CAFE_RADIO = "https://lainon.life/radio/cafe.ogg";
const CAFE = "cafe";
const EVERYTHING_RADIO = "https://lainon.life/radio/everything.ogg";
const EVERYTHING = "everything";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const botToken = process.env.LainRadioToken;
if (!botToken) {
  return;
}

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
});

client.login(botToken);

const radioLinkMap = new Map([
  [CYBERIA, CYBERIA_RADIO],
  [SWING, SWING_RADIO],
  [CAFE, CAFE_RADIO],
  [EVERYTHING, EVERYTHING_RADIO],
]);

//Client commands
client.on("message", async (receivedMessage) => {
  if (receivedMessage.content.substring(0, 1) == "$") {
    var args = receivedMessage.content.substring(1).split(" ");
    var cmd = args[0];
    var singleArg = args[1];

    console.log("Command passed: " + cmd + " Args length: " + args.length);
    let isLainCommand = COMMAND_PREFIX === cmd;
    let isLeaveCommand = COMMAND_LEAVE === cmd;
    let isInfoCommand = COMMAND_INFO === cmd;
    let isDonateCommand = COMMAND_DONATE === cmd;
    let isRadioCommand = radioLinkMap.get(singleArg);

    console.log("Is lain command: " + isLainCommand);
    console.log("Is radio command: " + isRadioCommand);

    if (isLainCommand && !singleArg) {
      let welcomeMessage = lainWelcome(cmd);
      receivedMessage.channel.send(welcomeMessage);
    } else if (
      isLainCommand &&
      isRadioCommand &&
      receivedMessage.member.voice.channel
    ) {
      console.log("in a voice channel, connecting now.");
      const connection = await receivedMessage.member.voice.channel.join();
      connection.voice.setSelfDeaf(true);
      console.log("Radio channel passed: [" + singleArg + "]");
      let radioLink = lainRadioFetch(singleArg);
      console.log("Radio channel: " + radioLink);
      if (!radioLink) {
        receivedMessage.channel.send("Unsupported radio");
        return;
      }

      const dispatcher = connection.play(radioLink);
      dispatcher.on("start", () => {
        receivedMessage.channel.send("Now playing " + singleArg + " radio.");
        console.log("playing radio");
      });

      dispatcher.on("debug", console.log);

      dispatcher.on("error", console.error);
    } else if (isLeaveCommand) {
      const connection = await receivedMessage.member.voice.channel.join();
      connection.disconnect();
    } else if (isDonateCommand) {
      receivedMessage.channel.send(
        "Donate to LainChan here: https://lainchan.org/donate.html"
      );
    } else if (isInfoCommand) {
      receivedMessage.channel.send(lainInfo());
    }
  }
});

function lainWelcome(cmd) {
  switch (cmd) {
    case "lain":
      let message =
        "Welcome to Lain Radio. Current radio stations are: " +
        [...radioLinkMap.keys()].join(", ") +
        "\n" +
        "To play a station the command is: $lain [station of choice]" +
        "\n" +
        "To get a list of commands and info: $info";
      return message;
    default:
      console.log("Unsupported command");
      break;
  }
}

function lainRadioFetch(arg) {
  return radioLinkMap.get(arg);
}

function lainInfo() {
  return (
    "Welcome to the Lain Radio Bot. Here are my commands: \n" +
    "$lain - Get a list of radio stations \n" +
    "$lain [radio station] - Play selected \n" +
    "$info - Get general commands on how to operate the bot \n" +
    "$donate - Link to where to support Lainchan forum \n" +
    "$leave - Lain Radio leaves the server"
  );
}
