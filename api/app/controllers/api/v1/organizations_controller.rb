module Api
    module V1
        class OrganizationsController < ApplicationController

            def create
                organization = Organization.new(
                    org_params[:organizations]
                )
                organization.save
                organization.build_configure().save
                employee = organization.employees.build(
                    employee_params[:employees]
                )
                employee.update(chief: true)
                profile = employee.build_profile(
                    profile_params[:employees]
                )
                
                if profile.save!
                    render json: {}, status: :ok
                else
                    render json: {}, status: :intternal_server_error
                end

            end

            def employees_shifts
                render json: {
                    shifts: @organization.shifts.selected_month(params[:period][0], params[:period][1])
                            }, status: :ok
            end

            def employees_unapproved_shifts
                render json: {
                    shifts: @organization.shifts.attend.where(confirmed: false)
                            }, status: :ok
            end

            
            def manage_timestamps
                timestamps = Timestamp.where(employee_id: @organization.employees.ids).order(:confirmed)
                return  render json: {
                    attendances: timestamps
                            }, status: :ok
            end  

            private

            def org_params
                params.require(:organizations).permit(organizations: [:name, :address, :lat, :lng])
            end

            def employee_params
                params.require(:organizations).permit(employees: [:name])
            end

            def profile_params
                params.require(:organizations).permit(employees: [:password,:email,:age])
            end

        end

    end

end