FROM --platform=linux/x86_64  ruby:2.6.5
RUN apt-get update -qq && apt-get install -y build-essential \
                       libpq-dev \
                       nodejs

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install --without test development
ADD . /app
EXPOSE 3000

CMD ["/bin/sh", "-c", "bundle exec rails db:drop & bundle exec rails db:create && bundle exec rails db:migrate && bundle exec rails db:seed && bundle exec unicorn -p 3000 -c /app/config/unicorn.rb -E production"]
# RUN apt-get update -qq && \
#     apt-get install -y build-essential \
#                        libpq-dev \
#                        nodejs
# ENV RAILS_ENV=production

# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev sudo vim

# RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
#     curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#     echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#     apt-get update && apt-get install -y yarn && apt-get install imagemagick

# RUN mkdir /app
# WORKDIR /app
# RUN mkdir -p tmp/pids
# RUN mkdir -p tmp/sockets
# COPY Gemfile /app/Gemfile
# COPY Gemfile.lock /app/Gemfile.lock

# RUN gem install bundler
# RUN bundle install --without test development
# COPY . /app
# EXPOSE 3000

# # 以下の記述があることでnginxから見ることができる
# VOLUME /app/public
# VOLUME /app/tmp

# CMD bash -c "rm -f tmp/pids/server.pid && bundle exec unicorn -p 3000 -c /app/config/unicorn.rb -E production && rm -f /app/tmp/pids/server.pid && bundle exec rails db:migrate"

# # # 起動
# # CMD ["/bin/sh", "-c", "rm -f tmp/pids/unicorn.pid && bundle exec rails db:migrate && bundle exec rails db:seed && bundle exec unicorn_rails -p 3000 -c /app/config/unicorn.rb && cat /app/emp/pids/unicorn.pid"]
# # CMD ["/bin/sh", "-c", "bundle exec rails db:migrate && bundle exec unicorn -p 3000 -c /app/config/unicorn.rb -E production"]