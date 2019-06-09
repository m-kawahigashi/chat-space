json.content @message.content
json.image @message.image.url
json.user_name @message.user.name
json.data @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id