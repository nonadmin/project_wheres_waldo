# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160229230210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_locations", force: :cascade do |t|
    t.integer  "image_id"
    t.integer  "character_id"
    t.integer  "pos_x"
    t.integer  "pos_y"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "characters", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "image_id"
  end

  create_table "highscores", force: :cascade do |t|
    t.string   "player",     default: "Waldough"
    t.integer  "score",      default: 0
    t.integer  "image_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "images", force: :cascade do |t|
    t.string   "src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.integer  "character_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "pos_x"
    t.integer  "pos_y"
    t.integer  "game_id"
  end

  add_index "tags", ["character_id", "game_id"], name: "index_tags_on_character_id_and_game_id", unique: true, using: :btree

end
