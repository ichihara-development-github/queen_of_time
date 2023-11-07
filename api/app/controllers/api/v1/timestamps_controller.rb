module Api
    module V1
        class TimestampsController < ApplicationController

            before_action :set_timestamp_params, only: %i[new]
          
            def index 
                return  render json: {
                    attendances:  @current_employee.timestamps.order(:date)
                            }, status: :ok   
            end

            def manage_timestamps
                return  render json: {
                    attendances:  Timestamp.where(@organization.empoyees.ids)
                            }, status: :ok   
            end

            def new    
                @at= @current_employee.timestamps.find_by(date: Date.today)&.attendance_time
                @lv= @current_employee.timestamps.find_by(date: Date.today)&.leaving_time     
                return  render json: {
                    positions: {
                        lat:  @organization.lat,
                        lng:  @organization.lng
                    },
                    status: {
                        at: !!@at,
                        lv: !!@lv
                    }
                            }, status: :ok 
            end

            def create  
                return render json: {}, status: :forbidden if !check_stamped("attendance")
                timestamp = @current_employee.timestamps.build(
                    name: @current_employee.name,
                    attendance_time: params[:timestamps][:attendance_time],
                    date: Time.at(params[:timestamps][:attendance_time])
                )

                return  render json: {name: @current_employee.name}, status: :created if timestamp.save!
            end

            def update
                return render json: {}, status: :forbidden if !check_stamped("leaving")
                timestamp = @current_employee.timestamps.last
                if timestamp.update(timestamp_params)
                    return  render json: {name: @current_employee.name}, status: :ok
                end
            end

            def modulate_timestamps
                Timestamp.find(timestamp_params[:id]).update_columns(timestamp_params.to_hash)
                render json: {}, status: :ok
            end

            def approve
                timestamps = Timestamp.where(id: params[:ids])
                if timestamps.update(confirmed: true)
                    render json: {}, status: :ok
                else
                    render json: {},status: :intternal_server_error
                end
            end

            private

            def timestamp_params
                params.require(:timestamps).permit(:id,
                                                   :attendance_time,
                                                   :leaving_time,
                                                   :updated_attendance_time,
                                                   :updated_leaving_time,
                                                   :updated_rest_time,
                                                #    :comment
                                                )
            end
       

            def set_timestamp_params
                @at= @current_employee.timestamps.find_by(date: Date.today)&.attendance_time
                @lv= @current_employee.timestamps.find_by(date: Date.today)&.leaving_time 
            end

            def check_stamped(type)
                set_params
                case type
                when "attendance" then
                    return false if @at
                when "leaving" then
                    return false if (!@at || !!@lv)
                end
                true
            end
        end

        
    end
end