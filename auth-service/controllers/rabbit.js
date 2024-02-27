const amqp = require("amqplib/callback_api");
const { connection } = require("mongoose");

// connecting to rabbitmq
var channel;
amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, chnl) {
    if (error1) {
      throw error1;
    }
    channel = chnl;
  });
});
exports.rabbit = {
  async send(req, res) {
    // channel.assertQueue("hello", {
    //   durable: false,
    // });
    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        var correlationId = Math.floor(
          Math.random() * 9999999999999
        ).toString();

        channel.consume(
          q.queue,
          function (msg) {
            if (msg.properties.correlationId == correlationId) {
              console.log(" [.] Got %s", msg.content.toString());
              res.status(200).send(msg.content.toString());
              setTimeout(function () {
                connection.close();
              }, 500);
            }
          },
          {
            noAck: true,
          }
        );
        console.log(req.body);
        channel.sendToQueue(
          "rpc_queue",
          Buffer.from(JSON.stringify(req.body.messages)),
          {
            correlationId: correlationId,
            replyTo: q.queue,
          }
        );
      }
    );

    // res.status(200).send("message sent");
  },
};
