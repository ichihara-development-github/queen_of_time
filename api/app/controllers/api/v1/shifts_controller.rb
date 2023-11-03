module Api
    module V1

        class ShiftsController < ApplicationController

        def assign_member
            employees = Employee.where(id: 
                @organization.employees.ids -
                @organization.shifts.assigned_member_ids(Date.parse(params[:date]))
            )
          
            render json: {employees: employees}, status: :ok
        end


        def index
            config = @organization.configure
            p @organization
            p config
            shifts = @organization.shifts.group_by do |s|
                s.date
            end
            render json: {
                shifts: shifts,
                myshifts: @current_employee.shifts,
                orgParams: {
                    open: config.open,
                    close: config.close,
                    name: @organization.name,
                    address: @organization.address
                }
                        }, status: :ok
        end

        def new
            shift_day = @organization.configure.shift_start_day ||= 1
            month = Date.today().next_month
            date = Date.new(month.year,month.month,shift_day)
            next_month = month.next_month
            dates = (date...Date.new(next_month.year,next_month.month,shift_day)).map{|d| p d }
            submitted_dates = @current_employee.shifts.pluck(:date)
            render json: {
                shifts: 
                (dates- submitted_dates).map{|date|
                 {employee_id: @current_employee.id,
                            name: @current_employee.name,
                            date: date
                        }
                },
            }, status: :ok
        end
    

        def create
            p Shift.where(date: "2023-10-1")
            @employee = Employee.find(shift_params[:employee_id])
            ActiveRecord::Base.transaction do
                @shift = @employee.shifts.build(shift_params)
                @shift.update(
                    name: @employee.name,
                    date: Date.parse(shift_params[:date]),
                    confirmed: true
                    )
                return false unless @shift.save!
             
            end

           
            render json: {shift: @shift}, status: :created
        end

        def assign
            ActiveRecord::Base.transaction do
                @shift = Shift.find(shift_params[:id])
                params = shift_params
                params[:confirmed] =  true
                return false unless @shift.update(params)
            end
            render json: {shift: @shift}, status: :created
        end

        def update
            Shift.update_coumns()
        end

        def submit_shifts
            ActiveRecord::Base.transaction do
                params[:shifts].each do |shift|
                    @shift = @current_employee.shifts.build(
                        name: shift[:name],
                        date: shift[:date],
                        attendance_time: shift[:attendance_time],
                        leaving_time: shift[:leaving_time],
                        rest: shift[:rest]
                    )
                    return false if !@shift.save 
                end
                render json: {}, status: :created
            end
        end

        def determine_shifts
            shifts = []
            params[:shifts].each do |s|
                shift = Shift.find(s[:id])
                shift.update_columns(
                    attendance_time: s[:attendance_time],
                    leaving_time: s[:leaving_time],
                    confirmed: true
                )
                shifts.push(shift)
            end
            render json: {shifts: shifts}, status: :ok

            
        end

        def destroy
            Shift.find(params[:id]).destroy
            render json: {}, status: :ok
        end

        private

        def shift_params
            params.require(:shifts).permit(:id, :employee_id,:name, :date, :attendance_time,:leaving_time,:rest, :comment, :confirmed)
        end

    end

    end
end