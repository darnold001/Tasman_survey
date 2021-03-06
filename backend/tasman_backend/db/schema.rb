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

ActiveRecord::Schema.define(version: 2019_10_01_192828) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "surveys", force: :cascade do |t|
    t.date "date"
    t.string "client"
    t.string "site"
    t.string "surveyor"
    t.string "mw"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "wells", force: :cascade do |t|
    t.string "wellID"
    t.float "rodHeight"
    t.float "corrected"
    t.string "camlock"
    t.float "depthToWater"
    t.float "gwe"
    t.float "gse"
    t.text "notes"
    t.float "lat"
    t.float "long"
    t.float "amslElev"
    t.float "cpRod"
    t.bigint "survey_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["survey_id"], name: "index_wells_on_survey_id"
  end

  add_foreign_key "wells", "surveys"
end
