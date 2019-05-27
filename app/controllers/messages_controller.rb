class MessagesController < ApplicationController
  before_action :set_group      # Groupモデルからgroupユーザー情報を引き出せる処理が代入されている@groupがmessages_controller内で使えるようになる。

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user) 
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @message = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index    #index.html.hamlページを表示する処理。
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
