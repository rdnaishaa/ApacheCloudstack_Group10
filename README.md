# Apache CloudStack 4.22 Implementation on Ubuntu 24.04

## Kelompok 10

### Anggota Kelompok

| Nama | NPM |
|---|---|
| Farhan Ramadhani Zakiyyandi | 2306220412 |
| Rivi Yasha Hafizhan | 2306250535 |
| Salahuddin Zidane Alghifari | 2206028200 |
| Farras Hakim Budi Handoyo | - |
| Anthonius Hendhy Wirawan | - |
| Filaga Tifira Muthi | - |
| Adhi Rajasa Rafif | - |
| Dimas Ananda Sutiardi | - |
| R. Aisha Syauqi Ramadhani | 2306250554 |

---

# Deskripsi Project

Project ini bertujuan untuk melakukan implementasi dan konfigurasi Apache CloudStack 4.22 menggunakan Ubuntu 24.04 sebagai mini private cloud environment.

Apache CloudStack digunakan untuk mengelola virtual machine, jaringan virtual, dan resource cloud dalam skala kecil menggunakan perangkat lokal/laptop.

---

# Tujuan Project

- Install Apache CloudStack 4.22
- Konfigurasi environment Ubuntu 24.04
- Membuat mini cloud infrastructure
- Deploy virtual machine menggunakan CloudStack
- Mengakses CloudStack melalui jaringan lokal area Departemen Teknik Elektro (DTE) maupun jaringan luar rumah menggunakan IP address server
- Mendokumentasikan seluruh proses implementasi

---

# Teknologi yang Digunakan

| Komponen | Versi |
|---|---|
| Ubuntu | 24.04 |
| Apache CloudStack | 4.22 |
| Java | OpenJDK 11 |
| Maven | 3.x |
| NodeJS | 12 LTS |
| MySQL | 8.x |
| Chrony | Latest |
| Hypervisor | KVM |

---

# Arsitektur Sistem

## Topologi Sederhana

```text
Client/User
     |
     v
CloudStack Management Server
     |
     v
KVM Hypervisor
     |
     v
Virtual Machines
```

---

# Dependency Installation

Sebelum melakukan instalasi Apache CloudStack, beberapa dependency perlu diinstall terlebih dahulu.

## Dependency yang Digunakan

- Maven
- Java OpenJDK 11
- NodeJS 12 LTS
- Apache Web Services Common Utilities (ws-commons-util)
- MySQL Server
- MySQLdb
- genisoimage
- Chrony (NTP)

---

# Install Dependency

## Update Repository

```bash
sudo apt update && sudo apt upgrade -y
```

## Install Java 11

```bash
sudo apt install openjdk-11-jdk -y
```

## Install Maven

```bash
sudo apt install maven -y
```

## Install NodeJS

```bash
sudo apt install nodejs -y
```

## Install MySQL

```bash
sudo apt install mysql-server -y
```

## Install Chrony

```bash
sudo apt install chrony -y
```

## Install Dependency Tambahan

```bash
sudo apt install genisoimage -y
```

---

# Verifikasi Dependency

## Java

```bash
java -version
```

## Maven

```bash
mvn --version
```

## NodeJS

```bash
node -v
```

## MySQL

```bash
mysql --version
```

## Chrony

```bash
chronyc -v
```

---

# Konfigurasi MySQL

Menambahkan konfigurasi MySQL yang dibutuhkan oleh Apache CloudStack.

## Edit Konfigurasi MySQL

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Tambahkan konfigurasi berikut:

```text
[mysqld]
server-id = 1
innodb_rollback_on_timeout = 1
innodb_lock_wait_timeout = 600
max_connections = 350
log-bin = mysql-bin
binlog-format = 'ROW'
```

---

# Menjalankan MySQL

```bash
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl status mysql
```

---

# Setup Database CloudStack

## Membuat Database CloudStack

```bash
sudo cloudstack-setup-databases cloud:<password>@localhost --deploy-as=root:<password>
```

Contoh:

```bash
sudo cloudstack-setup-databases cloud:cloudgroup10@localhost --deploy-as=root:cloudgroup10
```

---

# Konfigurasi Management Server

## Edit File Konfigurasi

```bash
sudo nano /etc/cloudstack/management/db.properties
```

Ubah IP address sesuai IP machine/server yang digunakan.

---

# Menjalankan CloudStack Management

```bash
sudo cloudstack-setup-management
```

## Restart Service CloudStack

```bash
sudo systemctl restart cloudstack-management
```

## Cek Status Service

```bash
sudo systemctl status cloudstack-management
```

---

# Akses Apache CloudStack

CloudStack dapat diakses melalui browser menggunakan format:

```text
http://<IP-ADDRESS>:8080/client
```

Contoh:

```text
http://10.0.2.15:8080/client
```

---

# Konfigurasi Network

Konfigurasi jaringan dilakukan agar CloudStack dapat diakses melalui jaringan lokal maupun internet.

## Langkah Konfigurasi

- Menggunakan Bridge Adapter
- Menentukan IP static
- Verifikasi koneksi menggunakan ping
- Memastikan port 8080 dapat diakses

---

# Dokumentasi Progress

## Progress Saat Ini

Project saat ini berhasil melakukan:

- Instalasi Apache CloudStack 4.22
- Konfigurasi dependency dan database
- Menjalankan CloudStack Management Server
- Mengakses dashboard Apache CloudStack melalui browser
- Akses dashboard menggunakan IP address lokal

CloudStack masih dalam tahap pengembangan dan konfigurasi lanjutan untuk deployment virtual machine dan implementasi mini cloud environment.

---

# Deployment Virtual Machine

Tahap deployment virtual machine belum dilakukan dan masih menjadi pengembangan lanjutan project.

## Rencana Deployment

1. Login ke CloudStack Dashboard
2. Membuat Zone
3. Membuat Pod
4. Menambahkan Cluster
5. Menambahkan KVM Host
6. Menambahkan Primary Storage
7. Deploy Virtual Machine

---

# Screenshot Dokumentasi

Tambahkan screenshot pada folder:

```text
/images
```

---

# Progress Mingguan

## Minggu 1
- Studi literatur Apache CloudStack
- Setup Ubuntu 24.04
- Install dependency

## Minggu 2
- Konfigurasi MySQL
- Setup database CloudStack
- Setup management server

## Minggu 3
- Berhasil mengakses dashboard Apache CloudStack melalui browser menggunakan IP address lokal
- Troubleshooting error HTTP 503

## Progress Saat Ini
- CloudStack Management Server berhasil dijalankan
- Dashboard login berhasil diakses
- Deployment virtual machine belum dilakukan

---

# Kendala dan Troubleshooting

## HTTP ERROR 503 Service Unavailable

### Error

Saat mengakses dashboard Apache CloudStack melalui:

```text
http://localhost:8080/client
```

muncul error:

```text
HTTP ERROR 503 Service Unavailable
```

### Penyebab Kemungkinan

- Service cloudstack-management belum berjalan
- Konfigurasi database belum benar
- MySQL belum aktif
- Dependency belum lengkap
- Konfigurasi IP address belum sesuai

### Troubleshooting

#### Cek status service CloudStack

```bash
sudo systemctl status cloudstack-management
```

#### Restart service CloudStack

```bash
sudo systemctl restart cloudstack-management
```

#### Cek status MySQL

```bash
sudo systemctl status mysql
```

#### Jalankan setup management server kembali

```bash
sudo cloudstack-setup-management
```

#### Cek log CloudStack

```bash
sudo tail -f /var/log/cloudstack/management/management-server.log
```

---

# Hasil Sementara Implementasi

Project berhasil melakukan:

- Instalasi Apache CloudStack
- Konfigurasi database MySQL
- Setup management server
- Akses dashboard Apache CloudStack melalui browser
- Pengujian akses menggunakan IP address lokal

Project masih dalam tahap pengembangan untuk implementasi mini cloud environment secara penuh.

---
