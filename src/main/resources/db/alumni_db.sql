-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2024 at 07:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `databasechangelog`
--

CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `databasechangelog`
--

INSERT INTO `databasechangelog` (`ID`, `AUTHOR`, `FILENAME`, `DATEEXECUTED`, `ORDEREXECUTED`, `EXECTYPE`, `MD5SUM`, `DESCRIPTION`, `COMMENTS`, `TAG`, `LIQUIBASE`, `CONTEXTS`, `LABELS`, `DEPLOYMENT_ID`) VALUES
('00000000000001', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', '2024-10-19 22:07:56', 1, 'EXECUTED', '9:f42d2680324529df080a1370434956e7', 'createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; addForeignKeyConstraint baseTableName=jhi_user_authority, constraintName=fk_authority_name, ...', '', NULL, '4.24.0', NULL, NULL, '9355872752'),
('20240820144504-1', 'jhipster', 'config/liquibase/changelog/20240820144504_added_entity_Event.xml', '2024-10-19 22:07:56', 2, 'EXECUTED', '9:221236b08485b4531aa41e82f2c52333', 'createTable tableName=event', '', NULL, '4.24.0', NULL, NULL, '9355872752'),
('20240820144504-1-data', 'jhipster', 'config/liquibase/changelog/20240820144504_added_entity_Event.xml', '2024-10-19 22:07:56', 3, 'EXECUTED', '9:c4ac57da3073feac9504ccc733b88d90', 'loadData tableName=event', '', NULL, '4.24.0', 'faker', NULL, '9355872752'),
('20240827094918-1', 'jhipster', 'config/liquibase/changelog/20240827094918_added_entity_Donation.xml', '2024-10-19 22:07:56', 4, 'EXECUTED', '9:9cb104bf10c3fecf90c7dcd95d1e210e', 'createTable tableName=donation', '', NULL, '4.24.0', NULL, NULL, '9355872752'),
('20240827094918-1-data', 'jhipster', 'config/liquibase/changelog/20240827094918_added_entity_Donation.xml', '2024-10-19 22:07:56', 5, 'EXECUTED', '9:d583f9af81c4bf5d3e7924b1be4b71be', 'loadData tableName=donation', '', NULL, '4.24.0', 'faker', NULL, '9355872752'),
('20240827094919-1', 'jhipster', 'config/liquibase/changelog/20240827094919_added_entity_Job.xml', '2024-10-19 22:07:56', 6, 'EXECUTED', '9:c2ae85d591e973bc26c3928539e21c46', 'createTable tableName=job', '', NULL, '4.24.0', NULL, NULL, '9355872752'),
('20240827094919-1-data', 'jhipster', 'config/liquibase/changelog/20240827094919_added_entity_Job.xml', '2024-10-19 22:07:56', 7, 'EXECUTED', '9:d1b66d4c7742f77428a49a958f2d8475', 'loadData tableName=job', '', NULL, '4.24.0', 'faker', NULL, '9355872752'),
('20240827094920-1', 'jhipster', 'config/liquibase/changelog/20240827094920_added_entity_News.xml', '2024-10-19 22:07:56', 8, 'EXECUTED', '9:274d177460e869ae5ad63f1f5fc2b9ac', 'createTable tableName=news', '', NULL, '4.24.0', NULL, NULL, '9355872752'),
('20240827094920-1-data', 'jhipster', 'config/liquibase/changelog/20240827094920_added_entity_News.xml', '2024-10-19 22:07:56', 9, 'EXECUTED', '9:9bafc52f78fe0b0d5abf5b99d8b8a05b', 'loadData tableName=news', '', NULL, '4.24.0', 'faker', NULL, '9355872752'),
('20240827094921-1', 'jhipster', 'config/liquibase/changelog/20240827094921_added_entity_VolunteerOP.xml', '2024-10-19 22:07:56', 10, 'EXECUTED', '9:67f04587a1e49eab0956dec69f595b39', 'createTable tableName=volunteer_op', '', NULL, '4.24.0', NULL, NULL, '9355872752'),
('20240827094921-1-data', 'jhipster', 'config/liquibase/changelog/20240827094921_added_entity_VolunteerOP.xml', '2024-10-19 22:07:56', 11, 'EXECUTED', '9:502c8bacd4496a919f84bdc4f31bfaca', 'loadData tableName=volunteer_op', '', NULL, '4.24.0', 'faker', NULL, '9355872752');

-- --------------------------------------------------------

--
-- Table structure for table `databasechangeloglock`
--

CREATE TABLE `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` tinyint(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `databasechangeloglock`
--

INSERT INTO `databasechangeloglock` (`ID`, `LOCKED`, `LOCKGRANTED`, `LOCKEDBY`) VALUES
(1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `id` bigint(20) NOT NULL,
  `donation_name` varchar(255) DEFAULT NULL,
  `contact_details` varchar(255) DEFAULT NULL,
  `billing_address` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `donation_type` varchar(255) DEFAULT NULL,
  `date_and_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation`
--

INSERT INTO `donation` (`id`, `donation_name`, `contact_details`, `billing_address`, `amount`, `description`, `donation_type`, `date_and_time`) VALUES
(1, 'positively or while', 'anodise faithfully aw', 'utterly', 'provided', 'beneficial', 'toy', 'comment'),
(2, 'amid', 'calorie absent deficient', 'handball', 'prohibition huzzah', 'only for civilize', 'while utter inasmuch', 'pore nicely'),
(3, 'clueless', 'aha', 'selfishly milk gah', 'fact paste vaguely', 'prestigious fervently', 'brr annotate', 'during'),
(4, 'per', 'explorer international lest', 'um whenever but', 'um safe rightfully', 'until retire', 'huzzah', 'grass'),
(5, 'bad around', 'following', 'gadzooks upbraid aha', 'assimilate association yet', 'so which cumbersome', 'provided outflank', 'furthermore builder'),
(6, 'yippee tenderly across', 'beside barricade', 'overgeneralize youthfully', 'gosh', 'tomorrow yacht tidy', 'imbalance brr', 'despite'),
(7, 'perfumed smoothly', 'outset flatline', 'including hmph', 'oof cite mirror', 'rundown', 'delightfully', 'meanwhile cruelty'),
(8, 'plot oh', 'mattock suture', 'because', 'killing thrush', 'if', 'pish jar politely', 'sane terrible'),
(9, 'violently', 'strong', 'including terribly', 'yuck round', 'psych idealistic', 'for whereas', 'although plate'),
(10, 'as', 'tender protrude', 'sepal bah majestically', 'jet', 'loyally instrumentalist', 'forenenst pesky', 'aw'),
(1500, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` bigint(20) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `date_and_time` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `target_audience` varchar(255) DEFAULT NULL,
  `event_coordinator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `event_name`, `date_and_time`, `location`, `event_type`, `description`, `target_audience`, `event_coordinator`) VALUES
(1, 'pfft wearily secondary', 'than', 'nor yippee ha', 'eager tidy cougar', 'round', 'different ha', 'swell vivaciously'),
(2, 'stopwatch notwithstanding', 'detainee satisfied knowledgeably', 'joyful nervously clause', 'ugly hence', 'pawn', 'faithfully', 'geez for fondly'),
(3, 'unless phew', 'after anguished whoa', 'circa while drab', 'restructure with', 'ah', 'whoa whereas yowza', 'versus who'),
(4, 'usually ugh', 'excitable', 'hawk judgementally', 'snort fantasise', 'instead worthwhile aw', 'nonbeliever', 'showy mmm'),
(5, 'sociable', 'hm gee bah', 'gosh between determined', 'refund micromanage certainly', 'careless', 'once coaxingly', 'connote'),
(6, 'simulate', 'even towards', 'whereas lowball qua', 'among', 'at interestingly', 'whoa but', 'than whose without'),
(7, 'eventually to although', 'until accelerate', 'appeal approximate yowza', 'wearily', 'cumbersome zowie enclosure', 'ha', 'though skeletal'),
(8, 'with', 'before only programming', 'gee', 'feline gently potentially', 'bleak wide-eyed where', 'along frantically', 'penalty phooey ew'),
(9, 'yum by', 'which wing', 'honeybee decision', 'save', 'flawed anenst', 'suddenly', 'afore facilitate woot'),
(10, 'boo', 'notoriety force when', 'theorize boo', 'fedelini', 'after', 'yet thoroughly', 'uh-huh er ew');

-- --------------------------------------------------------

--
-- Table structure for table `jhi_authority`
--

CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jhi_authority`
--

INSERT INTO `jhi_authority` (`name`) VALUES
('ROLE_ADMIN'),
('ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `jhi_user`
--

CREATE TABLE `jhi_user` (
  `id` bigint(20) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` tinyint(1) NOT NULL,
  `lang_key` varchar(10) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jhi_user`
--

INSERT INTO `jhi_user` (`id`, `login`, `password_hash`, `first_name`, `last_name`, `email`, `image_url`, `activated`, `lang_key`, `activation_key`, `reset_key`, `created_by`, `created_date`, `reset_date`, `last_modified_by`, `last_modified_date`) VALUES
(1, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Administrator', 'Administrator', 'admin@localhost', '', 1, 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(2, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', '', 1, 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jhi_user_authority`
--

CREATE TABLE `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jhi_user_authority`
--

INSERT INTO `jhi_user_authority` (`user_id`, `authority_name`) VALUES
(1, 'ROLE_ADMIN'),
(1, 'ROLE_USER'),
(2, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` bigint(20) NOT NULL,
  `job_name` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `salary_details` varchar(255) DEFAULT NULL,
  `job_description` varchar(255) DEFAULT NULL,
  `expire_date` varchar(255) DEFAULT NULL,
  `job_apply_method` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `job_name`, `company_name`, `location`, `salary_details`, `job_description`, `expire_date`, `job_apply_method`) VALUES
(1, 'gadzooks atomize', 'quarrelsomely leach', 'worry jaw geez', 'prance sledge', 'unless', 'through', 'horrible stone incidentally'),
(2, 'cruelly cede', 'uh-huh', 'clavier besides', 'absent', 'when tough frizzy', 'duh among', 'huzzah unwelcome'),
(3, 'burn-out fireman or', 'given aside joshingly', 'justly upliftingly', 'vacate pish alert', 'than neutralise whoa', 'atop gently around', 'coolly black-and-white sort'),
(4, 'lest after but', 'vapid', 'foreshadow necessitate', 'dark', 'although imbibe', 'given', 'glider'),
(5, 'via separately and', 'within', 'marry hmph brr', 'quicker offensive', 'slowly', 'lest', 'uh-huh considering furiously'),
(6, 'inquiry near so', 'lightning boulevard yawningly', 'zone', 'brandish uh-huh', 'enormously', 'gem commentate polished', 'icon remake required'),
(7, 'colorless bitterly painfully', 'deter unfinished bah', 'sleepily', 'separately petty pfft', 'ah drat compassionate', 'how hm', 'prize happen outside'),
(8, 'ensure', 'yahoo', 'inside even master', 'torn wallet', 'exactly', 'or when why', 'into of'),
(9, 'phew frozen', 'bail backpack', 'because psst', 'sizzling few', 'shakily', 'annually when gee', 'furthermore end'),
(10, 'beyond relish', 'airman pro motorcar', 'deliberately', 'pish hastily forthright', 'brocolli by masculine', 'inhibitor', 'hyphenation');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint(20) NOT NULL,
  `author_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `publish_date` varchar(255) DEFAULT NULL,
  `cover_area` varchar(255) DEFAULT NULL,
  `jhi_group` varchar(255) DEFAULT NULL,
  `expire_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `author_name`, `title`, `publish_date`, `cover_area`, `jhi_group`, `expire_date`) VALUES
(1, 'wedding', 'hence meanwhile by', 'as fondly', 'beside unnecessarily meh', 'till', 'ah'),
(2, 'bitterly not', 'beneath dizzy', 'attach', 'unnecessarily quizzical', 'underwrite patrol', 'concerning beach until'),
(3, 'an', 'pish', 'silently including partridge', 'conformation chronicle fat', 'usefully buttress recent', 'rude intensely affirm'),
(4, 'measly regarding', 'furthermore', 'diminish', 'yahoo at', 'oof next', 'wince quizzically unsightly'),
(5, 'sweatsuit furlough slew', 'automaton past', 'during after clause', 'object', 'despite minus', 'boring'),
(6, 'hmph intrigue', 'which nominalize despise', 'fooey', 'voluntarily ouch', 'teammate whenever loving', 'up diligently'),
(7, 'mmm detest', 'coke aha', 'weaponize why', 'yum innocently', 'considering', 'sternly rampage midst'),
(8, 'where', 'unripe under oof', 'or anenst', 'of down', 'reorganise ruddy oof', 'crossly ambitious'),
(9, 'except emend', 'if', 'ha', 'within stravaig sparse', 'between', 'excluding'),
(10, 'whereas quirkily', 'tonic before', 'joyfully tripod', 'opposite', 'when nor xylophone', 'supposing gadzooks');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_op`
--

CREATE TABLE `volunteer_op` (
  `id` bigint(20) NOT NULL,
  `volunteer_name` varchar(255) DEFAULT NULL,
  `date_and_time` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `time_duration` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `member` varchar(255) DEFAULT NULL,
  `volunteer_op_coordinator` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer_op`
--

INSERT INTO `volunteer_op` (`id`, `volunteer_name`, `date_and_time`, `location`, `time_duration`, `description`, `member`, `volunteer_op_coordinator`) VALUES
(1, 'plonk disappoint so', 'fooey what boohoo', 'inasmuch sheepishly boohoo', 'eek', 'inasmuch', 'noted bore', 'beyond'),
(2, 'watermelon lest', 'meh inside rash', 'mantel bathroom', 'brisk sticky hungry', 'above which', 'frown following peek', 'sheepishly woot'),
(3, 'nail though', 'or vacantly wholly', 'ensconce alb', 'who wrongly', 'and', 'astride whopping', 'smooth'),
(4, 'course', 'duh ick', 'bachelor', 'even who', 'mostly', 'geez extremely', 'incidentally'),
(5, 'than rise which', 'buck scarily', 'lest', 'given haemorrhage hence', 'aside however bold', 'dearly till deploy', 'that ah yahoo'),
(6, 'negative typeface', 'phew unless however', 'anti an', 'secret drawer', 'forked drat', 'um cruelly', 'opposite over'),
(7, 'unlike ha', 'pricey pirate', 'absent unethically whereas', 'postmark damage yuck', 'on palatalise', 'fancy', 'finally socialism mellow'),
(8, 'sustenance', 'livid pedestrianize wangle', 'defiantly', 'diligently whereas', 'equally hot', 'harmonise infringe', 'bedevil complexity likewise'),
(9, 'instead discourse', 'crouch overturn bold', 'till', 'via', 'gadzooks', 'never', 'healthily seriously'),
(10, 'evenly encash bead', 'cylinder past', 'earnings sardine ugh', 'than', 'lymphocyte obediently', 'lest faithfully destroy', 'gift');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `databasechangeloglock`
--
ALTER TABLE `databasechangeloglock`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jhi_authority`
--
ALTER TABLE `jhi_authority`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `jhi_user`
--
ALTER TABLE `jhi_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_user_login` (`login`),
  ADD UNIQUE KEY `ux_user_email` (`email`);

--
-- Indexes for table `jhi_user_authority`
--
ALTER TABLE `jhi_user_authority`
  ADD PRIMARY KEY (`user_id`,`authority_name`),
  ADD KEY `fk_authority_name` (`authority_name`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `volunteer_op`
--
ALTER TABLE `volunteer_op`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donation`
--
ALTER TABLE `donation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1501;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1500;

--
-- AUTO_INCREMENT for table `jhi_user`
--
ALTER TABLE `jhi_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1050;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1500;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1500;

--
-- AUTO_INCREMENT for table `volunteer_op`
--
ALTER TABLE `volunteer_op`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1500;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jhi_user_authority`
--
ALTER TABLE `jhi_user_authority`
  ADD CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
