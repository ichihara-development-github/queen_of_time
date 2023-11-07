module Api
    module V1

        class EmployeesController < ApplicationController


            def index
                @employees = @organization.employees.order(:name)
                render json: {employees: employee_statistic}, status: :ok
            end


            def  initial_notifications
                render json: {
                    badges: {
                        employees:0,
                        attendance:Timestamp.where(employee_id: @current_employee.organization.employees.ids, confirmed: false).length,
                        chat:0,
                        notification:Notification.unread(@current_employee.id).length,
                        shift:0,
                    }
                        }, status: :ok

            end

            def create
                employee = @organization.employees.build(
                    employee_params
                )
                profile = employee.build_profile(
                    profile_params
                )
                
                if profile.save!
                    render json: {
                        employees: @organization.employees
                    }, status: :created
                else
                    render json: {}, status: :intternal_server_error
                end

            end


            def destroy
                if Employee.find(params[:id]).destroy
                    render json: {
                        employees: @organization.employees
                    }, status: :ok
                else
                    render json: {}, status: :intternal_server_error
                end
            end

            private

            def employee_params
                params.require(:employees).permit(:name, :image)
            end

            def profile_params
                params.require(:employees).permit(:telephone, :email, :address, :transportation_expenses, :password)
            end

            def employee_statistic
                statistic = []
                attendances = @organization.timestamps
                shifts = @organization.shifts

                @employees.each do |e|
                    total_attendances = attendances.where(employee_id: e.id)
                    total_shifts = shifts.where(employee_id: e.id)
                    absent = [(total_shifts.count - total_attendances.count),0].max
                    
                    total_attendances.count == 0 ?
                        shift_submit_rate =  "未出勤"
                    :
                        shift_submit_rate =  (total_attendances.count - total_shifts.count)  /  total_attendances.count
                    
                    recent_shift = total_shifts.where(employee_id: e.id).where("date > ?", Date.today).first&.date
                    statistic.push(
                        {
                            id: e.id,
                            name: e.name,
                            image: e.image,
                            chief: e.chief,
                            attendances: total_attendances.count,
                            absent: absent,
                            shift_submit_rate: shift_submit_rate,
                            recent_shift: recent_shift&.strftime("%Y年%m月%d日"),
                            created: e.created_at.strftime("%Y年%m月%d日")
                        }
                    )
                end

                
                statistic
            end
        end
    end

end