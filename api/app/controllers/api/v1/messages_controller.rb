module Api
    module V1
        class MessagesController < ApplicationController

            before_action :set_room, only: %i[index create]

            def index
                messages = @room.messages.order(send_date: :ASC) 
                messages.where.not(employee_id: @current_employee.id).update(read: true)
                render json: {
                    companion: @room.companion(@current_employee).name,
                    # avatar:@room.companion(@current_employee).image,
                    avatar:@room.companion(@current_employee).image,
                    messages: messages
                    }, status: :ok
            end

            def create
                message = @room.messages.create(
                    employee_id: @current_employee.id,
                    content: params[:messages],
                    send_date: Time.zone.today())

                notice_param = {
                    name: @current_employee.name,
                    image:""
                }

                render json: {
                    message: message
                    }, status: :created
            end

            def destroy
                message = Message.find(params[:id])
                message.destroy
                render json: {}, status: :ok
            end

            private

            def set_room
                @room = Room.find(params[:room_id])
            end
        end
    end
end
