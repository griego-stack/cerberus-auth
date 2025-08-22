import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755905382275 implements MigrationInterface {
    name = 'Init1755905382275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_profile\` (\`user_id\` int NOT NULL, \`first_name\` varchar(50) NULL, \`last_name\` varchar(50) NULL, \`email\` text NOT NULL, \`avatar_url\` text NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(15) NOT NULL, UNIQUE INDEX \`IDX_39c1a7b4cdd7cfb27b9ee9e500\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`confirmation_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(50) NOT NULL, \`expires_at\` datetime NOT NULL, \`is_used\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_mfa\` (\`user_id\` int NOT NULL, \`secret\` text NOT NULL, \`iv\` varchar(32) NOT NULL, \`is_enabled\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(50) NOT NULL, \`expires_at\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`revoked\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, \`user_device_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`email\` text NOT NULL, \`password\` text NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_login_at\` datetime NULL, \`provider_id\` int NULL, \`role_id\` int NULL, \`user_mfa\` int NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`REL_f928a602cbe6a9bd944d4aeb75\` (\`user_mfa\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`audit_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`level\` varchar(10) NOT NULL DEFAULT 'info', \`message\` text NOT NULL, \`metadata\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`device_info\` text NOT NULL, \`ip_address\` text NOT NULL, \`trusted\` tinyint NOT NULL DEFAULT 0, \`last_used_at\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_eee360f3bff24af1b6890765201\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`confirmation_token\` ADD CONSTRAINT \`FK_f52c470d7af4afb7a1795762a35\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_mfa\` ADD CONSTRAINT \`FK_a3db12d521d7b1f7d17c71e465a\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` ADD CONSTRAINT \`FK_6bbe63d2fe75e7f0ba1710351d4\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` ADD CONSTRAINT \`FK_1b0532ff290bff005dd2c828e8b\` FOREIGN KEY (\`user_device_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_cace4a159ff9f2512dd42373760\` FOREIGN KEY (\`id\`) REFERENCES \`user_profile\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5e3a2b86fd9a9c22c266ae04731\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_f928a602cbe6a9bd944d4aeb75d\` FOREIGN KEY (\`user_mfa\`) REFERENCES \`user_mfa\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`audit_log\` ADD CONSTRAINT \`FK_cb11bd5b662431ea0ac455a27d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`audit_log\` DROP FOREIGN KEY \`FK_cb11bd5b662431ea0ac455a27d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_f928a602cbe6a9bd944d4aeb75d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5e3a2b86fd9a9c22c266ae04731\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_cace4a159ff9f2512dd42373760\``);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` DROP FOREIGN KEY \`FK_1b0532ff290bff005dd2c828e8b\``);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` DROP FOREIGN KEY \`FK_6bbe63d2fe75e7f0ba1710351d4\``);
        await queryRunner.query(`ALTER TABLE \`user_mfa\` DROP FOREIGN KEY \`FK_a3db12d521d7b1f7d17c71e465a\``);
        await queryRunner.query(`ALTER TABLE \`confirmation_token\` DROP FOREIGN KEY \`FK_f52c470d7af4afb7a1795762a35\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_eee360f3bff24af1b6890765201\``);
        await queryRunner.query(`DROP TABLE \`user_device\``);
        await queryRunner.query(`DROP TABLE \`audit_log\``);
        await queryRunner.query(`DROP INDEX \`REL_f928a602cbe6a9bd944d4aeb75\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`refresh_token\``);
        await queryRunner.query(`DROP TABLE \`user_mfa\``);
        await queryRunner.query(`DROP TABLE \`confirmation_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_39c1a7b4cdd7cfb27b9ee9e500\` ON \`provider\``);
        await queryRunner.query(`DROP TABLE \`provider\``);
        await queryRunner.query(`DROP TABLE \`user_profile\``);
    }

}
