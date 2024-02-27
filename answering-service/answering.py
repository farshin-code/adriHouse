from openai import OpenAI
import pika
import json
import os
from dotenv import load_dotenv
import requests

load_dotenv()
open_api_key = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=open_api_key)


def extract_sql_from_response(response: str) -> str:

    print("[.] response: ", response)
    lines = response.split("\n")

    sql_lines = [line.strip() for line in lines if line.strip().startswith("SELECT")]

    sql_query = " ".join(sql_lines)
    res = requests.post(
        os.environ.get("API_SERVICE_URL"),
        json={"sqlQuery": sql_query + ";"},
    )
    return res.text


def answer(messages: str) -> str:

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo", messages=json.loads(messages)
    )
    response = str(completion.choices[0].message.content.strip())
    sql_query = extract_sql_from_response(response)

    return sql_query


def on_request(ch, method, props, body):
    print(" [.] Received %r" % body)

    ch.basic_publish(
        exchange="",
        routing_key=props.reply_to,
        properties=pika.BasicProperties(correlation_id=props.correlation_id),
        body=answer(body),
    )
    ch.basic_ack(delivery_tag=method.delivery_tag)


connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=os.environ.get("RABBITMQ_URL"))
)

channel = connection.channel()

channel.queue_declare(queue="rpc_queue")


channel.basic_consume(queue="rpc_queue", on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
channel.start_consuming()
