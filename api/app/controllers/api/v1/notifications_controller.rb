module Api
    module V1
        class NotificationsController < ApplicationController

            def index
              
                notifications = Notification.recent(@current_employee)
                return  render json: {
                    notifications:   notifications
                            }, status: :ok  
                Notification.all.update_all(read: false)
            end

            def all_notifications
                return  render json: {
                    notifications:   Notification.all_notifications(@current_employee)
                            }, status: :ok 
            end

           

            def destroy
            end

            def update_notification_read
                Notification.find(params[:id]).update(read: true)
                return  render json: {}, status: :ok  
            end

        end
    end

end
