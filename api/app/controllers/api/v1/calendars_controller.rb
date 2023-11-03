module Api
    module V1
        class CalendarsController < ApplicationController
        
            def index 
              shifts = @organization.shifts.group_by do |s|
                s.date
              end
                render json: {
                  shifts: shifts,
                  events: @organization.calendars               
                }, status: :ok
            end

            def create
              
              p @organization.calendars
              p @organization.calendars.new()
              @organization.calendars.create(calendar_params)
                render json: {
                  events: @organization.calendars               
                }, status: :created
            end

            def update
              event = Calendar.find(params[:id])
              event.update(calendar_params)
                render json: {
                  events: @organization.calendars               
                }, status: :ok
            end

            def destroy
              Calendar.find(params[:id]).destroy
              render json: {
                events: @organization.calendars               
              }, status: :ok
            end

            private

            def calendar_params
              params.require(:calendars).permit(:title, :start, :end, :description, :color)
            end
        end
end
end