require "capistrano/setup"
require "capistrano/deploy"

require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano3/unicorn'

require 'capistrano/git_copy'
install_plugin Capistrano::GitCopy::SCM

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }

set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.0.0-p247'
