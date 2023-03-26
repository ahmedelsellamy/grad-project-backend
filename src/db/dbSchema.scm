-- graduation_project.game definition

CREATE TABLE `game` (
  `game_id` int NOT NULL,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`game_id`)
)


-- graduation_project.teacher definition

CREATE TABLE `teacher` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `last_name` varchar(40) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_0900_as_ci NOT NULL,
  `image` blob,
  `phone_num` varchar(20) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
)


-- graduation_project.academic_year definition

CREATE TABLE `academic_year` (
  `academic_year_id` int NOT NULL AUTO_INCREMENT,
  `academic_year_num` int NOT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`academic_year_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `academic_year_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
)


-- graduation_project.student definition

CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `age` int NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `image` blob,
  `academic_year_id` int DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `student_FK` (`academic_year_id`),
  CONSTRAINT `student_FK` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_year` (`academic_year_id`) ON DELETE SET NULL
)


-- graduation_project.subject definition

CREATE TABLE `subject` (
  `subject_id` int NOT NULL,
  `name` varchar(25) NOT NULL,
  `academic_year_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `academic_year_id` (`academic_year_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_year` (`academic_year_id`),
  CONSTRAINT `subject_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
)


-- graduation_project.task definition

CREATE TABLE `task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `teacher_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
)


-- graduation_project.task_assignment definition

CREATE TABLE `task_assignment` (
  `task_id` int NOT NULL,
  `student_id` int NOT NULL,
  `game_id` int NOT NULL,
  `state` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`task_id`,`student_id`,`game_id`),
  KEY `student_id` (`student_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `task_assignment_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`),
  CONSTRAINT `task_assignment_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `task_assignment_ibfk_3` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`)
)


-- graduation_project.teacher_student definition

CREATE TABLE `teacher_student` (
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`teacher_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `teacher_student_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `teacher_student_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
)


-- graduation_project.lesson definition

CREATE TABLE `lesson` (
  `lesson_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `subject_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lesson_id`),
  KEY `subject_id` (`subject_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `lesson_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
)


-- graduation_project.lesson_image definition

CREATE TABLE `lesson_image` (
  `lesson_image_id` int NOT NULL AUTO_INCREMENT,
  `lesson_id` int NOT NULL,
  `image` blob NOT NULL,
  PRIMARY KEY (`lesson_image_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_image_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`)
)


-- graduation_project.lesson_number definition

CREATE TABLE `lesson_number` (
  `lesson_number_id` int NOT NULL AUTO_INCREMENT,
  `lesson_id` int NOT NULL,
  `number_value` decimal(10,2) NOT NULL,
  PRIMARY KEY (`lesson_number_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_number_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`)
)


-- graduation_project.lesson_sentence definition

CREATE TABLE `lesson_sentence` (
  `lesson_sentence_id` int NOT NULL AUTO_INCREMENT,
  `lesson_id` int NOT NULL,
  `sentence` text NOT NULL,
  PRIMARY KEY (`lesson_sentence_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_sentence_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`)
)


-- graduation_project.lesson_word_arabic definition

CREATE TABLE `lesson_word_arabic` (
  `lesson_word_arabic_id` int NOT NULL AUTO_INCREMENT,
  `lesson_id` int NOT NULL,
  `word_arabic` varchar(255) NOT NULL,
  PRIMARY KEY (`lesson_word_arabic_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_word_arabic_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`)
)

-- graduation_project.lesson_word_english definition

CREATE TABLE `lesson_word_english` (
  `lesson_word_english_id` int NOT NULL AUTO_INCREMENT,
  `lesson_id` int NOT NULL,
  `word_english` varchar(255) NOT NULL,
  PRIMARY KEY (`lesson_word_english_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_word_english_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`)
)


-- graduation_project.task_item definition

CREATE TABLE `task_item` (
  `task_item_id` int NOT NULL AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `lesson_id` int NOT NULL,
  `lesson_image_id` int DEFAULT NULL,
  `lesson_word_arabic_id` int DEFAULT NULL,
  `lesson_word_english_id` int DEFAULT NULL,
  `lesson_number_id` int DEFAULT NULL,
  `lesson_sentence_id` int DEFAULT NULL,
  PRIMARY KEY (`task_item_id`),
  KEY `task_id` (`task_id`),
  KEY `lesson_id` (`lesson_id`),
  KEY `lesson_image_id` (`lesson_image_id`),
  KEY `lesson_word_arabic_id` (`lesson_word_arabic_id`),
  KEY `lesson_word_english_id` (`lesson_word_english_id`),
  KEY `lesson_number_id` (`lesson_number_id`),
  KEY `lesson_sentence_id` (`lesson_sentence_id`),
  CONSTRAINT `task_item_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`),
  CONSTRAINT `task_item_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`),
  CONSTRAINT `task_item_ibfk_3` FOREIGN KEY (`lesson_image_id`) REFERENCES `lesson_image` (`lesson_image_id`),
  CONSTRAINT `task_item_ibfk_4` FOREIGN KEY (`lesson_word_arabic_id`) REFERENCES `lesson_word_arabic` (`lesson_word_arabic_id`),
  CONSTRAINT `task_item_ibfk_5` FOREIGN KEY (`lesson_word_english_id`) REFERENCES `lesson_word_english` (`lesson_word_english_id`),
  CONSTRAINT `task_item_ibfk_6` FOREIGN KEY (`lesson_number_id`) REFERENCES `lesson_number` (`lesson_number_id`),
  CONSTRAINT `task_item_ibfk_7` FOREIGN KEY (`lesson_sentence_id`) REFERENCES `lesson_sentence` (`lesson_sentence_id`)
)


-- graduation_project.feedback definition

CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `task_item_id` int NOT NULL,
  `student_id` int NOT NULL,
  `failed_attempts` int DEFAULT NULL,
  `feedback_text` text,
  PRIMARY KEY (`feedback_id`),
  KEY `task_item_id` (`task_item_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`task_item_id`) REFERENCES `task_item` (`task_item_id`),
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
)