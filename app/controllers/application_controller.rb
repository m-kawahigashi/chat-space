class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!       #ログイン済ユーザーのみにアクセスを許可する処理。
  before_action :configure_permitted_parameters, if: :devise_controller?   

  protected

  def configure_permitted_parameters                            #追加するパラメータの許可処理。
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])  #nameカラムの追加許可。
  end
end
