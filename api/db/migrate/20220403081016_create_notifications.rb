class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.references :employee
      t.integer :received_employee, nill: false
      t.string :name
      t.string :icon
      t.string :title
      t.string :content
      t.boolean :read, default: false
      t.timestamps
    end
  end
end
