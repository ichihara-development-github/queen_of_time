class AddTimestamps < ActiveRecord::Migration[5.2]
  def change
    create_table :timestamps do |t|
      t.references :employee
      t.string :name, null: false
      t.date :date, null: false
      t.integer :attendance_time
      t.integer :leaving_time
      t.integer :updated_attendance_time
      t.integer :updated_leaving_time
      t.integer :updated_rest_time
      t.integer :rest_time
      t.integer :working_time
      t.integer :overtime
      t.integer :midnight_time
      t.integer :midnight_overtime
      t.boolean :confirmed, default: false
      t.timestamps
    end
  end
end
