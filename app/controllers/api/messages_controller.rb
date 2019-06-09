class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @message = @group.messages.where('id > ?', params[:id])
      respond_to do |format|
        format.html
        format.json{@messages = @message}
    end
  end
end