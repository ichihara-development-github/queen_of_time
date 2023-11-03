class Timestamp < ApplicationRecord
    
    belongs_to :employee
    has_one :organization

    scope :confirmed, -> {where(confirmed: true)}

    validates :date, uniqueness: { scope: :employee }
    after_update :calculate_worktime

    scope :already_attend, -> {find_by(date: Date.today).attendance_time}

    scope :already_leaved, ->{find_by(date: Date.today).leaving_time}


    #----------------method-----------

    def monthly(month)
        where("date > ? AND date < ?", month.beginning_of_month, month.end_of_month)
    end

     
    def calculate_worktime
        p attendance_time = (self.updated_attendance_time ||= self.attendance_time )
        p leaving_time = (self.updated_leaving_time ||= self.leaving_time )
        p total_time = ((leaving_time - attendance_time)/60)
        p rest_time = if total_time >= 480
                         60
                      elsif total_time >= 360
                         45
                      else
                        0
                      end
        rest_time = (self.updated_rest_time ||= rest_time )
        p working_time = [total_time - rest_time,0].max
        p overtime = [0,(working_time - (60 * 8))].max
        midnight_time = [0,
                            (Time.at(leaving_time) - 
                            (self.date.to_time + (60 * 60 * 22))) / 60 
                           ].max
        p midnight_overtime = (midnight_time if overtime > 0) || 0
        self.update_columns(
            working_time: working_time.floor,
            rest_time: rest_time,
            overtime: overtime.floor,
            midnight_time: [working_time,midnight_time].min.floor,
            midnight_overtime: midnight_overtime.floor
        )
           
    end


end