# Apache CloudStack 4.22 Implementation on Ubuntu 24.04 ## Kelompok 10 ### Anggota Kelompok | Nama | NPM | |---|---| | Farhan Ramadhani Zakiyyandi | 2306220412 | | Rivi Yasha Hafizhan | 2306250535 | | Salahuddin Zidane Alghifari | 2206028200 | | Farras Hakim Budi Handoyo | 2306250610 | | Anthonius Hendhy Wirawan | 2306161795 | | Filaga Tifira Muthi | 2306208445 | | Adhi Rajasa Rafif | 2306266943 | | Dimas Ananda Sutiardi | 2306250586 | | R. Aisha Syauqi Ramadhani | 2306250554 | --- # Deskripsi Project Project ini bertujuan untuk melakukan implementasi dan konfigurasi Apache CloudStack 4.22 menggunakan Ubuntu 24.04 sebagai mini private cloud environment. Apache CloudStack digunakan untuk mengelola virtual machine, jaringan virtual, dan resource cloud dalam skala kecil menggunakan perangkat lokal/laptop. --- # Tujuan Project - Install Apache CloudStack 4.22 - Konfigurasi environment Ubuntu 24.04 - Membuat mini cloud infrastructure - Deploy virtual machine menggunakan CloudStack - Mengakses CloudStack melalui jaringan lokal area Departemen Teknik Elektro (DTE) maupun jaringan luar rumah menggunakan IP address server - Mendokumentasikan seluruh proses implementasi --- # Teknologi yang Digunakan | Komponen | Versi | |---|---| | Ubuntu | 24.04 | | Apache CloudStack | 4.22 | | Java | OpenJDK 11 | | Maven | 3.x | | NodeJS | 12 LTS | | MySQL | 8.x | | Chrony | Latest | | Hypervisor | KVM | --- # Arsitektur Sistem ## Topologi Sederhana
text
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
--- # Dependency Installation Sebelum melakukan instalasi Apache CloudStack, beberapa dependency perlu diinstall terlebih dahulu. ## Dependency yang Digunakan - Maven - Java OpenJDK 11 - NodeJS 12 LTS - Apache Web Services Common Utilities (ws-commons-util) - MySQL Server - MySQLdb - genisoimage - Chrony (NTP) - rpmbuild or dpkg-dev --- # Install Dependency ## Update Repository
bash
sudo apt update && sudo apt upgrade -y
## Install Java 11
bash
sudo apt install openjdk-11-jdk -y
## Install Maven
bash
sudo apt install maven -y
## Install NodeJS
bash
sudo apt install nodejs -y
## Install MySQL
bash
sudo apt install mysql-server -y
## Install Chrony
bash
sudo apt install chrony -y
## Install Dependency Tambahan
bash
sudo apt install genisoimage -y
Dependency tambahan berdasarkan dokumentasi:
bash
sudo apt install dpkg-dev -y
--- # Verifikasi Dependency ## Java
bash
java -version
## Maven
bash
mvn --version
## NodeJS
bash
node -v
## MySQL
bash
mysql --version
## Chrony
bash
chronyc -v
--- # Konfigurasi MySQL Menambahkan konfigurasi MySQL yang dibutuhkan oleh Apache CloudStack. ## Edit Konfigurasi MySQL
bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
Tambahkan konfigurasi berikut:
text
[mysqld]
server-id = 1
innodb_rollback_on_timeout = 1
innodb_lock_wait_timeout = 600
max_connections = 350
log-bin = mysql-bin
binlog-format = 'ROW'
--- # Menjalankan MySQL
bash
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl status mysql
--- # Setup Database CloudStack ## Membuat Database CloudStack
bash
sudo cloudstack-setup-databases cloud:<password>@localhost --deploy-as=root:<password>
Contoh:
bash
sudo cloudstack-setup-databases cloud:password@localhost --deploy-as=root:password
Atau menggunakan kredensial spesifik kelompok:
bash
sudo cloudstack-setup-databases cloud:cloudgroup10@localhost --deploy-as=root:cloudgroup10
--- # Konfigurasi Management Server ## Edit File Konfigurasi
bash
sudo nano /etc/cloudstack/management/db.properties
Ubah IP address sesuai IP machine/server yang digunakan. Jika menggunakan IP statis Tailscale, ubah IP menjadi IP address machine:
text
cluster.node.IP=100.64.11.92
cluster.servlet.port=9090
region.id=1
--- # Menjalankan CloudStack Management
bash
sudo cloudstack-setup-management
## Restart Service CloudStack
bash
sudo systemctl restart cloudstack-management
## Cek Status Service
bash
sudo systemctl status cloudstack-management
--- # Akses Apache CloudStack CloudStack dapat diakses melalui browser menggunakan format:
text
http://<IP-ADDRESS>:8080/client
Contoh:
text
http://10.0.2.15:8080/client
Atau sekarang dashboard dapat diakses melalui ip tersebut selama machine telah terhubung ke tailscale:
text
http://100.64.11.92:8080/client
Kredensial Login Default: - username : admin - password : password --- # Konfigurasi Network Konfigurasi jaringan dilakukan agar management server CloudStack dapat diakses oleh host dari luar jaringan. ## Langkah Konfigurasi - Menggunakan Tailscale - Install dan konfigurasi Tailscale pada management server - install dan konfigurasi Tailscale pada host Dapatkan ip statis untuk server:
bash
tailscale ip -4
--- # Dokumentasi Progress ## Progress Saat Ini Project saat ini berhasil melakukan: - Instalasi Apache CloudStack 4.22 - Konfigurasi dependency dan database - Menjalankan CloudStack Management Server - Mengakses dashboard Apache CloudStack melalui browser - Akses dashboard menggunakan IP address lokal - Menghubungkan dan mengonfigurasi management server ke Tailscale - Menginisialisasi konfigurasi pembuatan Zone melalui dashboard. CloudStack masih dalam tahap pengembangan dan konfigurasi lanjutan untuk deployment virtual machine dan implementasi mini cloud environment. --- # Deployment Virtual Machine Tahap deployment virtual machine belum dilakukan dan masih menjadi pengembangan lanjutan project. ## Rencana Deployment 1. Login ke CloudStack Dashboard 2. Membuat Zone 3. Membuat Pod 4. Menambahkan Cluster 5. Menambahkan KVM Host 6. Menambahkan Primary Storage 7. Deploy Virtual Machine ### Konfigurasi Pembuatan Zone (Berdasarkan Progress Saat Ini) - **Zone type**: Core - **Zone details**: - Name: Zone-Cloud-10 - IPv4 DNS 1: 8.8.8.8 - Internal DNS 1: 8.8.8.8 - Hypervisor: KVM - Default guest CIDR for isolated networks: 10.1.1.0/24 - **Physical Network**: - Network name: Physical Network 1 - Isolation method: VLAN - Traffic types: GUEST, MANAGEMENT, PUBLIC - Tags: cloudbr0 --- # Progress Mingguan ## Minggu 1 - Studi literatur Apache CloudStack - Setup Ubuntu 24.04 - Install dependency ## Minggu 2 - Konfigurasi MySQL - Setup database CloudStack - Setup management server ## Minggu 3 - Berhasil mengakses dashboard Apache CloudStack melalui browser menggunakan IP address lokal - Troubleshooting error HTTP 503 ## Progress Saat Ini - CloudStack Management Server berhasil dijalankan - Dashboard login berhasil diakses - Deployment virtual machine belum dilakukan - Inisialisasi setup Core Zone dan Physical Network di Dashboard UI. --- # Kendala dan Troubleshooting ## HTTP ERROR 503 Service Unavailable ### Error Saat mengakses dashboard Apache CloudStack melalui:
text
http://localhost:8080/client
muncul error:
text
HTTP ERROR 503 Service Unavailable
### Penyebab Kemungkinan - Service cloudstack-management belum berjalan - Konfigurasi database belum benar - MySQL belum aktif - Dependency belum lengkap - Konfigurasi IP address belum sesuai ### Troubleshooting #### Cek status service CloudStack
bash
sudo systemctl status cloudstack-management
#### Restart service CloudStack
bash
sudo systemctl restart cloudstack-management
#### Cek status MySQL
bash
sudo systemctl status mysql
#### Jalankan setup management server kembali
bash
sudo cloudstack-setup-management
#### Cek log CloudStack
bash
sudo tail -f /var/log/cloudstack/management/management-server.log
--- # Hasil Sementara Implementasi Project berhasil melakukan: - Instalasi Apache CloudStack - Konfigurasi database MySQL - Setup management server - Akses dashboard Apache CloudStack melalui browser - Pengujian akses menggunakan IP address lokal Project masih dalam tahap pengembangan untuk implementasi mini cloud environment secara penuh. --- # Konfigurasi Host/Hypervisor Langkah terakhir adalah menyiapkan sisi host atau hypervisor yang akan dikelola oleh CloudStack: 1. Melakukan pembaruan sistem (update) dan pastikan Tailscale juga aktif di sisi host.
bash
sudo apt update && sudo apt upgrade -y
2. Memastikan Tailscale juga aktif di sisi host.
bash
curl -fsSL https://tailscale.com/install.sh | sh
3. tailscale up digunakan untuk mengaktifkan dan menghubungkan perangkat ke jaringan Tailscale VPN.
bash
sudo tailscale up
4. install hypervisor KVM
bash
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils chrony cpu-checker
verifikasi hardware virtualization
bash
kvm-ok
5. add cloudstack key dan repository
bash
sudo mkdir -p /etc/apt/keyrings
wget -O- http://packages.shapeblue.com/release.asc | sudo gpg --dearmor -o /etc/apt/keyrings/cloudstack.gpg
echo "deb [signed-by=/etc/apt/keyrings/cloudstack.gpg] http://packages.shapeblue.com/cloudstack/upstream/debian/4.22 /" | sudo tee /etc/apt/sources.list.d/cloudstack.list
6. install cloudstack agent
bash
sudo apt install cloudstack-agent -y
7. Melakukan konfigurasi pada QEMU Console dan buat Virtual Bridge (jembatan jaringan virtual) agar mesin virtual (VM) nantinya bisa saling berkomunikasi.
bash
sudo nano /etc/libvirt/qemu.conf
VNC is configured to listen on 127.0.0.1 by default. To make it listen on all public interfaces, uncomment this next option.
conf
vnc_listen = "0.0.0.0"
bash
sudo systemctl restart libvirtd
Virtual Bridge
bash
sudo nano /etc/netplan/50-cloud-init.yaml
yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: false
      dhcp6: false
  bridges:
    cloudbr0:
      interfaces: [enp0s3]
      dhcp4: true
      macaddress: 08:00:27:26:0a:2a
bash
sudo netplan apply
--- # Dokumentasi Konfigurasi Storage ## 1. Setup NFS
bash
sudo apt update
sudo apt install nfs-ganesha nfs-ganesha-vfs -y
## 2. Membuat Directory Primary dan Secondary
bash
sudo mkdir -p /export/primary
sudo mkdir -p /export/secondary
sudo chmod 777 /export/primary /export/secondary
## 3. Edit Konfigurasi NFS-Ganesha
bash
sudo nano /etc/ganesha/ganesha.conf
conf
EXPORT
{
    Export_Id = 1;
    Path = /export/primary;
    Pseudo = /export/primary;
    Access_Type = RW;
    Squash = No_Root_Squash;
    SecType = "sys";
    Filesystem_Engine = VFS;

    CLIENT {
        Clients = *;
    }
}

EXPORT
{
    Export_Id = 2;
    Path = /export/secondary;
    Pseudo = /export/secondary;
    Access_Type = RW;
    Squash = No_Root_Squash;
    SecType = "sys";
    Filesystem_Engine = VFS;

    CLIENT {
        Clients = *;
    }
}
## 4. Menampilkan IP WSL
bash
ip addr show eth0 | grep inet
## 5. Menjalankan NFS-Ganesha
bash
sudo systemctl start nfs-ganesha
## 6. Memeriksa Status NFS-Ganesha
bash
sudo systemctl status nfs-ganesha
## 7. Install Tailscale
bash
curl -fsSL https://tailscale.com/install.sh | sh
## 8. Login ke Tailscale
bash
sudo tailscale up --authkey=<AUTH_KEY> --accept-routes
## 9. Menampilkan IP Tailscale
bash
tailscale ip -4
## 10. Menampilkan IP Internal Storage
bash
ip addr show eth0 | grep inet | awk '{print $2}' | cut -d/ -f1
## 11. Restart NFS-Ganesha
bash
sudo systemctl restart nfs-ganesha
sudo systemctl status nfs-ganesha
## 12. Konfigurasi Port Forwarding (Windows PowerShell)
powershell
netsh interface portproxy add v4tov4 listenport=2049 listenaddress=<TAILSCALE_IP> connectport=2049 connectaddress=<WSL_IP>
## 13. Verifikasi Port Forwarding
powershell
netsh interface portproxy show all
