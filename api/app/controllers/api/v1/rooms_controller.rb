module Api
    module V1
        class RoomsController < ApplicationController

            def index
                render json: {
                    rooms: send_rooms, 
                    tempId:@current_employee.id
                    }, staus: :ok
            end


            def invite_employees
                employees = @organization.employees.select_companions(@current_employee)
                render json: {employees: employees}, staus: :ok
            end

            def create
                if  room = @current_employee.rooms.create!
                    room.employees << Employee.find(params[:rooms][:id])
                    render json: {rooms: send_rooms}, status: :created
                end
            end


            def send_rooms
            
               @current_employee.rooms.map{|r|
               companion = r.companion(@current_employee)
               read = r.messages.where(read: nil).where.not(employee_id: @current_employee.id).count
                {
                    id: r.id,
                    name: companion.name,
                    image: companion.image,
                    read: read
                 }
            }
            end
            
        end

    end
end
