module Api
    module V1
        class SessionsController < ApplicationController

            include ::ActionController::Cookies

            def test 
                render json: {test: "ok"},status: :ok
            end


            def login
                sleep(2)
                prof = Profile.find_by(email: session_params[:email]) 
                return (render json: {}, status: :unauthorized) unless (prof&.employee && prof&.authenticate(session_params[:password]))
                session[:employee_id] = prof.employee.id
                
                @current_employee = prof.employee
                @organization = @current_employee.organization
                p Organization.all
                p session[:employee_id]
                p prof
                p @current_employee
                p @organization
                @current_employee.chief ?
                    (render json: chief_params,status: :ok)
                  :
                    (render json: employee_params,status: :ok)
            end 
            def logout
                session[:employee_id] = nil
                render json: {}, status: :ok
            end

            def check_session
                return render json: {}, status: :forbidden unless @current_employee
                @current_employee.chief ?
                    (render json: chief_params,status: :ok)
                  :
                    (render json: employee_params,status: :ok)
            end 


            private

            def session_params
                params.require(:session).permit(:email, :password)
            end

            def badge_params
                {
                    message: @current_employee.messages.where(read: nil).where.not(employee_id: @current_employee.id).count,
                    attendance: @organization.timestamps.where(confirmed: false).count,
                    shift:  @organization.shifts.where(confirmed: false).count,
                    calendar: @organization.calendars.where(start: Date.today()).count,
                    notification:  @current_employee.notifications.unread.count,
                    task: @organization.taskcards.joins(:tasks).count
                }
            end

            def chief_params
                {
                    name: @current_employee.name,
                    chief: true,
                    config: @organization.configure,
                    orgName: @organization.name,
                    orgAddress: @organization.address,
                    badges: badge_params
                }
            end

            def employee_params
                {
                    name: @current_employee.name,
                    chief: false
                }
            end


        end

    end

end