import React from 'react';

export default (
  <select>
    {/* <optgroup label="Tanda Tangan">
      <option value="ttd_dpjp">TTD DPJP</option>
      <option value="ttd_penyerta">TTD Penyerta (Multi Select Row)</option>
    </optgroup> */}
    <optgroup label="Master Diagnosis">
      <option value="master_diagnosis_apoteker">Apoteker</option>
      <option value="master_diagnosis_bidan">Bidan</option>
      <option value="master_diagnosis_fisioterapis">Fisioterapis</option>
      <option value="master_diagnosis_nutrisionis">Nutrisionis</option>
      <option value="master_diagnosis_paramedis">Paramedis</option>
      <option value="master_diagnosis_ix_all_multiselect">
        Diagnosis ICD IX (All) (Multi Select Row)
      </option>
      <option value="master_diagnosis_x_all_multiselect">
        Diagnosis ICD X (All) (Multi Select Row)
      </option>
    </optgroup>
    <optgroup label="Kunjungan">
      <option value="asal_masuk">Asal Masuk</option>
      <option value="tgl_masuk">Tanggal Masuk</option>
      <option value="usia_dirawat">Usia Dirawat</option>
      <option value="tgl_pulang">Tanggal Pulang</option>
      <option value="tgl_meninggal">Tanggal Meninggal</option>
      <option value="riwayat_personal">Riwayat Personal</option>
    </optgroup>
    <optgroup label="Pre-Hospital">
      <option value="pre_hospital">All</option>
    </optgroup>
    <optgroup label="Pemeriksaan ABCDE">
      <option value="pengkajian_gawat_darurat_medis">Medis</option>
      <option value="pengkajian_gawat_darurat_paramedis">Paramedis</option>
      <option value="pengkajian_gawat_darurat_all">Semua PPA</option>
    </optgroup>

    <optgroup label="Screening Apgar Score">
      <option value="skrining_apgar_score">Semua data</option>
    </optgroup>
    <optgroup label="Screening Down Score">
      <option value="skrining_down_score">Semua data</option>
    </optgroup>

    <optgroup label="Screening Risiko Jatuh">
      <option value="skrining_jatuh_awal">
        Screening Awal (Kesimpulan saja)
      </option>
      <option value="skrining_jatuh_awal_item">
        Screening Awal (Dengan Item / Detail)
      </option>
      <option value="skrining_jatuh">All</option>
    </optgroup>
    <optgroup label="Screening Risiko Jatuh Morse Falls Scale">
      <option value="skrining_jatuh_dewasa_awal">Screening Awal</option>
      <option value="skrining_jatuh_dewasa">All</option>
    </optgroup>
    <optgroup label="Screening Risiko Jatuh Humpty Dumpty">
      <option value="skrining_jatuh_anak_awal">Screening Awal</option>
      <option value="skrining_jatuh_anak">All</option>
    </optgroup>
    <optgroup label="Screening Risiko Jatuh Ontario Modified Stratify">
      <option value="skrining_jatuh_lansia_awal">Screening Awal</option>
      <option value="skrining_jatuh_lansia">All</option>
    </optgroup>
    {/* <optgroup label="Screening Risiko Jatuh Ontario Modified Stratify 2">
                <option value="skrining_jatuh_lansia2_awal">Screening Awal</option>
            </optgroup> */}
    <optgroup label="Screening Risiko Jatuh Time Up & Go">
      <option value="skrining_jatuh_rawat_jalan_awal">Screening Awal</option>
      <option value="skrining_jatuh_rawat_jalan">All</option>
    </optgroup>

    <optgroup label="Screening Risiko Jatuh Geriatri">
      <option value="skrining_jatuh_geriatri">All</option>
    </optgroup>

    <optgroup label="Screening Nyeri">
      <option value="skrining_nyeri_awal">Screening Awal</option>
      <option value="skrining_nyeri">All</option>
    </optgroup>
    <optgroup label="Screening Nyeri Wong Baker Faces (Numeric Pain Scale)">
      <option value="skrining_nyeri_wong_baker_awal">Screening Awal</option>
      <option value="skrining_nyeri_wong_baker">All</option>
    </optgroup>
    <optgroup label="Screening Nyeri Numeric">
      <option value="skrining_nyeri_numeric_awal">Screening Awal</option>
      <option value="skrining_nyeri_numeric">All</option>
    </optgroup>
    <optgroup label="Screening Nyeri Cries">
      <option value="skrining_nyeri_cries_awal">Screening Awal</option>
      <option value="skrining_nyeri_cries">All</option>
    </optgroup>
    <optgroup label="Screening Nyeri FLACC">
      <option value="skrining_nyeri_flacc_awal">Screening Awal</option>
      <option value="skrining_nyeri_flacc">All</option>
    </optgroup>
    <optgroup label="Screening Nyeri Geriatri">
      {/* <option value="skrining_nyeri_geriatri_awal">Screening Awal</option> */}
      <option value="skrining_nyeri_geriatri">All</option>
    </optgroup>

    <optgroup label="Screening Gizi">
      <option value="skrining_gizi_awal">Screening Awal</option>
      <option value="skrining_gizi">All</option>
    </optgroup>
    <optgroup label="Screening Gizi Dewasa">
      <option value="skrining_gizi_dewasa_awal">Screening Awal</option>
      <option value="skrining_gizi_dewasa">All</option>
    </optgroup>
    <optgroup label="Screening Gizi Anak">
      <option value="skrining_gizi_anak_awal">Screening Awal</option>
      <option value="skrining_gizi_anak">All</option>
    </optgroup>
    <optgroup label="Screening Gizi Obsetri">
      <option value="skrining_gizi_obsetri_awal">Screening Awal</option>
      <option value="skrining_gizi_obsetri">All</option>
    </optgroup>
    <optgroup label="Intervensi Gizi">
      <option value="skrining_lanjutan_gizi_awal">Screening Awal</option>
      <option value="skrining_lanjutan_gizi">ALL</option>
    </optgroup>

    <optgroup label="Screening Activity Daily Living">
      <option value="skrining_adl_awal">Screening Awal</option>
      <option value="skrining_adl">ALL</option>
    </optgroup>

    <optgroup label="Screening Decubitus Norton Scale">
      <option value="skrining_decubitus_norton_scale_awal">
        Screening Awal
      </option>
      <option value="skrining_decubitus_norton_scale">ALL</option>
    </optgroup>

    <optgroup label="Screening Depresi Geriatri">
      <option value="skrining_depresi_geriatri_awal">Screening Awal</option>
      <option value="skrining_depresi_geriatri">ALL</option>
    </optgroup>

    <optgroup label="Screening Status Mental">
      <option value="skrining_status_mental_awal">Screening Awal</option>
      <option value="skrining_status_mental">ALL</option>
    </optgroup>

    <optgroup label="Screening Gerak Dasar">
      <option value="skrining_gerak_dasar_awal">Screening Awal</option>
      <option value="skrining_gerak_dasar">Semua data</option>
    </optgroup>

    <optgroup label="Screening Riwayat Persalinan">
      <option value="skrining_riwayat_persalinan">All (Multi Select)</option>
    </optgroup>

    <optgroup label="Screening Riwayat Kehamilan">
      <option value="skrining_riwayat_kehamilan">All (Multi Select)</option>
    </optgroup>

    {/* <optgroup label="Riwayat Kemoterapi">
      <option value="skrining_riwayat_kemoterapi">All (Multi Select)</option>
    </optgroup> */}

    {/*<optgroup label="Screening Efek Samping Obat Kanker">
                <option value="skrining_efek_samping_obat_kanker_awal">Screening Awal</option>
                <option value="skrining_efek_samping_obat_kanker">ALL</option>
            </optgroup> */}

    <optgroup label="Anamnesis">
      {/*<option value="anamnesis">All</option>*/}
      <option value="anamnesis_awal">Anamnesis Awal</option>
      <option value="anamnesis_medis">Medis</option>
      <option value="anamnesis_paramedis">Paramedis</option>
      <option value="anamnesis_nutrisionis">Nutrisionis</option>
      <option value="anamnesis_bidan">Bidan</option>
      <option value="anamnesis_fisioterapis">Fisioterapis</option>
      <option value="anamnesis_apoteker">Apoteker</option>
      <option value="anamnesis_all">Semua PPA</option>
      <option value="anamnesis_all_klaim">
        Semua PPA (Khusus untuk klaim)
      </option>
      <option value="anamnesis_all_selective">Semua PPA (Select Cell)</option>
      <option value="anamnesis_all_optional">
        Semua PPA (Tanpa Pengguna, Tanpa KU & Riwayat Penyakit Sekarang)
      </option>
      <option value="anamnesis_all_optional_gizi">
        Riwayat Gizi (Dari Anamnesis)
      </option>
      <option value="anamnesis_all_optional_obat">
        Riwayat Obat (Dari Anamnesis)
      </option>
    </optgroup>
    <optgroup label="Pemeriksaan Umum">
      <option value="pemeriksaan_umum_awal">All Awal</option>
      <option value="keadaan_umum_awal">Keadaan Umum Awal</option>
      <option value="keadaan_umum_awal_optional">
        Keadaan Umum Awal (AVPU / GCS)
      </option>
      <option value="keadaan_umum_ttv_awal">Keadaan Umum & TTV Awal</option>
      <option value="keadaan_umum">Keadaan Umum</option>
      <option value="ttv_awal">TTV Awal</option>
      <option value="ttv_antropometri_awal">TTV & Antropometri Awal</option>
      <option value="ttv">TTV</option>
      <option value="ttv_multiselect">TTV (Multi Select Row)</option>
      <option value="status_emergency_awal">Status Emergency Awal</option>
      <option value="status_emergency">Status Emergency</option>
      <option value="antropometri_awal">Antropometri Awal</option>
      <option value="antropometri">Antropometri</option>
      <option value="urine_awal">Urine Awal</option>
      <option value="urine_faeces_awal">Urine & Faeces Awal</option>
      <option value="urine">Urine</option>
      <option value="faeces_awal">Faeces Awal</option>
      <option value="faeces">Faeces</option>
      <option value="pemeriksaan_lain_awal">Pemeriksaan Lain Awal</option>
      <option value="pemeriksaan_lain">Pemeriksaan Lain</option>
    </optgroup>
    {/* <optgroup label="Pemeriksaan Fisik">
      <option value="pemeriksaan_fisik">All</option>
                <option value="status_generalis">Status Generalis</option>
                <option value="status_lokalis">Status Lokalis</option>
      <option value="pemeriksaan_fisik_medis">Medis</option>
      <option value="pemeriksaan_fisik_paramedis">Paramedis</option>
      <option value="pemeriksaan_fisik_nutrisionis">Nutrisionis</option>
      <option value="pemeriksaan_fisik_bidan">Bidan</option>
      <option value="pemeriksaan_fisik_fisioterapis">
        Fisioterapis
      </option>
      <option value="pemeriksaan_fisik_apoteker">Apoteker</option>

      <option value="status_generalis_medis">
        Status Generalis Medis
      </option>
      <option value="status_generalis_paramedis">
        Status Generalis Paramedis
      </option>
      <option value="status_generalis_nutrisionis">
        Status Generalis Nutrisionis
      </option>
      <option value="status_generalis_bidan">
        Status Generalis Bidan
      </option>
      <option value="status_generalis_fisioterapis">
        Status Generalis Fisioterapis
      </option>
      <option value="status_generalis_apoteker">
        Status Generalis Apoteker
      </option>

      <option value="status_lokalis_medis">Status Lokalis Medis</option>
      <option value="status_lokalis_paramedis">
        Status Lokalis Paramedis
      </option>
      <option value="status_lokalis_nutrisionis">
        Status Lokalis Nutrisionis
      </option>
      <option value="status_lokalis_bidan">Status Lokalis Bidan</option>
      <option value="status_lokalis_fisioterapis">
        Status Lokalis Fisioterapis
      </option>
      <option value="status_lokalis_apoteker">
        Status Lokalis Apoteker
      </option>
    </optgroup> */}
    <optgroup label="Pemeriksaan Fisik 2">
      <option value="pemeriksaan_fisik2">Semua PPA dan Status</option>
      <option value="pemeriksaan_fisik2_medis">Medis</option>
    </optgroup>
    <optgroup label="CPPT">
      <option value="cppt_multiselect">Semua data (Multi Select Row)</option>
      <option value="cppt_selective">Semua data (Select Cell)</option>
      <option value="cppt_dokter_multiselect">
        Semua data (Hanya Spesialis) (Multi Select Row)
      </option>
      <option value="cppt_data_subject_multiselect">
        Hanya Data Subject (Multi Select Row)
      </option>
      <option value="cppt_data_object_multiselect">
        Hanya Data Object (Multi Select Row)
      </option>

      <option value="cppt_data_planning_all_multiselect">
        Hanya Data Planning (All) (Multi Select Row)
      </option>
      <option value="cppt_data_planning_multiselect">
        Hanya Data Planning (Hanya Spesialis) (Multi Select Row)
      </option>
      <option value="cppt_data_planning_paramedis_multiselect">
        Hanya Data Planning (Hanya Paramedis) (Multi Select Row)
      </option>

      <option value="cppt_data_implementation_all_multiselect">
        Hanya Data Implementation (All) (Multi Select Row)
      </option>
      <option value="cppt_data_implementation_multiselect">
        Hanya Data Implementation (Hanya Spesialis) (Multi Select Row)
      </option>
      <option value="cppt_data_implementation_paramedis_multiselect">
        Hanya Data Implementation (Hanya Paramedis) (Multi Select Row)
      </option>

      <option value="cppt_data_instruction_all_multiselect">
        Hanya Data Instruction (All) (Multi Select Row)
      </option>
      <option value="cppt_data_instruction_multiselect">
        Hanya Data Instruction (Hanya Spesialis) (Multi Select Row)
      </option>
      <option value="cppt_data_instruction_paramedis_multiselect">
        Hanya Data Instruction (Hanya Paramedis) (Multi Select Row)
      </option>

      <option value="cppt_multiselect_before_after">
        Semua data (Sebelum dan Sesudah) (Multi Select Row)
      </option>
      <option value="cppt_selective_before_after">
        Semua data (Sebelum dan Sesudah) (Select Cell)
      </option>
      <option value="cppt_data_subject_singleselect">
        Hanya Data Subject (Tanpa Label)
      </option>
      <option value="cppt_data_object_singleselect">
        Hanya Data Object (Tanpa Label)
      </option>
      <option value="cppt_data_planning_singleselect">
        Hanya Data Planning (Tanpa Label)
      </option>
      <option value="cppt_data_instruction_singleselect">
        Hanya Data Instruction (Tanpa Label)
      </option>
      <option value="cppt_data_implementation_singleselect">
        Hanya Data Implementation (Tanpa Label)
      </option>
      {/* <option value="cppt_data_planning_paramedis_singleselect">
        Hanya Data Planning (Tanpa Label) (Hanya Paramedis)
      </option> */}
    </optgroup>
    <optgroup label="Diagnosis (ICD IX)">
      <option value="diagnosis_ix">All (Multi Select Row)</option>
      <option value="diagnosis_ix_six_month">
        Diagnosis 6 Bulan Terakhir (Multi Select Row)
      </option>
    </optgroup>
    <optgroup label="Diagnosis (ICD X)">
      <option value="diagnosis">All (Multi Select Row)</option>
      <option value="diagnosis_dokter_multiselect">
        Diagnosis Utama (Spesialis) (Dx Terakhir Tiap Dokter) (Multi Select Row)
      </option>
      <option value="diagnosis_dokter_penyerta_multiselect">
        Diagnosis Penyerta (Spesialis) (Dx Terakhir Tiap Dokter) (Multi Select
        Row)
      </option>
      <option value="diagnosis_tanpa_pelaksana_peringkat">
        All (Spesialis) (Tanpa Pelaksana & Peringkat) (Multi Select Row)
      </option>
      <option value="diagnosis_six_month">
        Diagnosis 6 Bulan Terakhir (Multi Select Row)
      </option>
    </optgroup>
    <optgroup label="Diagnosis Lainnya">
      <option value="cppt_data_diagnosis_multiselect">
        All (Dari CPPT) (Multi Select Row)
      </option>
      <option value="diagnosis_keperawatan">All (Multi Select Row)</option>
    </optgroup>
    <optgroup label="Rencana Terapi">
      <option value="rencana_terapi">Semua Data (Multi Select Row)</option>
      <option value="rencana_terapi_dokter_multiselect">
        Hanya Dokter Spesialis (Multi Select Row)
      </option>
      <option value="rencana_terapi_obat_multiselect">
        Obat (Multi Select Row)
      </option>
    </optgroup>
    <optgroup label="Tindakan">
      <option value="tindakan_all_multiselect">
        Semua data (Multi Select Row)
      </option>
      <option value="tindakan_all_multiselect_name_only">
        Semua data (Tanpa Jumlah dan Rupiah) (Multi Select Row)
      </option>
    </optgroup>
    <optgroup label="Parameter Tindakan">
      <option value="parameter_tindakan">Semua Data</option>
    </optgroup>
    <optgroup label="Informasi Biaya">
      <option value="informasi_biaya_jalan">Hanya Rawat Jalan</option>
    </optgroup>
    <optgroup label="Pemeriksaan Penunjang">
      <option value="pemeriksaan_penunjang_lab">
        Laboratorium (PK) (Multi Select Row)
      </option>
      <option value="pemeriksaan_penunjang">
        Semua Data Penunjang (Multi Select Row, Hanya data kunjungan saja)
      </option>
      <option value="pemeriksaan_penunjang_all_hasil">
        Semua Data Penunjang + Hasil (Multi Select Row)
      </option>
    </optgroup>
    <optgroup label="Catatan Akhir">
      <option value="catatan_akhir">All</option>
      <option value="alasan_masuk">Alasan Masuk</option>
      <option value="catatan_krs">Catatan KRS</option>
    </optgroup>
  </select>
);
