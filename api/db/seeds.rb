# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ActiveRecord::Base.transaction do
    3.times do |n|
        organization = Organization.create(
            name: "org_NO_#{n}",
            address: "Tokyo-#{n}",
        )
        p "--------#{organization.name}------------"
    
        organization.create_configure(
            open: 9,
            close: 20,
            min_work_time: 4,
            submittable_start: Date.today+10,
            submittable_end: Date.today+20
        )
    
        5.times do |m|
            
            employee = organization.employees.create(
                name: "employee_#{m}",
                chief: !!(m == 0)
            )
    
            employee.create_profile(
            telephone: "090-1111-2222",
            address: "Osaka-#{m}",
            password: "password",
            email: "sample@user#{m}.com"
            )
            p employee
        end
    
        shift = Employee.second.shifts.create(
        name: "斎藤_#{n}太郎",
        date: Date.today()+n,
        attendance_time: (8+(n/2)).round,
        leaving_time: 18,
        comment: "承認お願いします"
    )
    p "-----------------#{shift.name}----created-----"
    
        organization.calendars.create(
            title: "event#{n}",
            start: "2022-03-2#{n}",
            description: "商談。朝9時に金沢駅集合",
            color: "red"
        )
    end
    
        (1..8).each do |n|
            employee = Employee.find(Employee.second.id)
        feed = employee.timestamps.create(
            name: employee.name,
            date: Date.today()+n,
            attendance_time: ((Time.now() -36000).to_f),
            leaving_time:  (Time.now.to_f),
            working_time: 480 + (-1)**n,
            rest_time:60,
            overtime:10+(-2)**n,
            midnight_time:0,
            confirmed:false)
        
            p feed 
        end
    
    end
    
        
        