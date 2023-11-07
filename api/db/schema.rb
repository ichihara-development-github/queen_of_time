# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_10_08_225724) do

  create_table "calendars", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "organization_id"
    t.string "title"
    t.date "start"
    t.string "end"
    t.string "date"
    t.text "description"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_calendars_on_organization_id"
  end

  create_table "configures", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.integer "open", default: 9, null: false
    t.integer "close", default: 18, null: false
    t.integer "min_work_time", default: 1
    t.date "submittable_start", default: "2023-11-07", null: false
    t.date "submittable_end", default: "2023-11-14", null: false
    t.integer "stampable_distance", default: 80
    t.string "red", default: "商談"
    t.string "royalblue", default: "面接"
    t.string "green", default: "会議"
    t.string "orange", default: "研修"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "shift_start_day"
    t.integer "shift_span"
    t.index ["organization_id"], name: "index_configures_on_organization_id"
  end

  create_table "employee_rooms", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "employee_id"
    t.bigint "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_employee_rooms_on_employee_id"
    t.index ["room_id"], name: "index_employee_rooms_on_room_id"
  end

  create_table "employees", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "organization_id"
    t.string "name", default: "sample", null: false
    t.string "image"
    t.boolean "chief", default: false
    t.boolean "admin", default: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_employees_on_organization_id"
  end

  create_table "messages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "room_id"
    t.bigint "employee_id"
    t.string "content"
    t.string "image_url"
    t.boolean "read"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.string "send_date"
    t.index ["employee_id"], name: "index_messages_on_employee_id"
    t.index ["room_id"], name: "index_messages_on_room_id"
  end

  create_table "notifications", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "employee_id"
    t.integer "received_employee"
    t.string "name"
    t.string "icon"
    t.string "title"
    t.string "content"
    t.boolean "read", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_notifications_on_employee_id"
  end

  create_table "organizations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", default: "Tyokyo", null: false
    t.float "lat", default: 35.6815
    t.float "lng", default: 139.757
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.string "telephone", default: "090-0000-0000", null: false
    t.string "address", default: "Osaka", null: false
    t.integer "age"
    t.string "email", null: false
    t.string "password_digest", null: false
    t.index ["employee_id"], name: "index_profiles_on_employee_id"
  end

  create_table "rooms", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shifts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "employee_id"
    t.string "name", null: false
    t.date "date", null: false
    t.float "attendance_time"
    t.float "leaving_time"
    t.text "comment"
    t.boolean "rest", default: false
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_shifts_on_employee_id"
  end

  create_table "taskcards", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.string "title"
    t.integer "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_taskcards_on_organization_id"
  end

  create_table "tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "taskcard_id", null: false
    t.string "content"
    t.integer "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["taskcard_id"], name: "index_tasks_on_taskcard_id"
  end

  create_table "timestamps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb3", force: :cascade do |t|
    t.bigint "employee_id"
    t.string "name", null: false
    t.date "date", null: false
    t.integer "attendance_time"
    t.integer "leaving_time"
    t.integer "updated_attendance_time"
    t.integer "updated_leaving_time"
    t.integer "updated_rest_time"
    t.integer "rest_time"
    t.integer "working_time"
    t.integer "overtime"
    t.integer "midnight_time"
    t.integer "midnight_overtime"
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_timestamps_on_employee_id"
  end

end
