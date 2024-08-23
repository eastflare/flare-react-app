# 본 Python을 실행시킨 디렉토리 아래에서 tsx 파일에 포함된 다국어 처리 구문을 추출하는 프로그램.  ( Front-End 용 )
# 추출된 다국어는 메시지 테이블에 insert 하여 다국어 적용될 수 있도록 하세요.
# 다국어 적용은 t('다국어코드', '등록안되어있을경우 사용할 값')  형태를 기본으로 합니다. 
# 다국어코드는 com.menu.{menuid}, com.code.{groupcode}.{code} 는 각각 메뉴 / 공통코드에 사용되는 형태이며
#             화면ID.label, 화면ID.column, 화면ID.option, 화면ID.alert 로 특정화면내 어디서 사용되는지 구분합니다.
#
# Python 설치는 개발자용 설치 패키지를 참고하세요. - PIP 설치 가이드 참조.
# 
# 실행 예) C:\workspace\front-end\src> python multi-lang-find.py > out.txt


# 아래 쿼리를 활용하여 out.txt를 TB_RPJTE_MSG_TMP_M 테이블에 입력하고, tb_rpjte_msg_m 테이블의 데이터를 갱신하세요.

# 이 테이블은 메시지코드 생성을 위한 임시 테이블 입니다.
# create table TB_RPJTE_MSG_TMP_M
# (
#   seq               NUMBER,
#   file_path         VARCHAR2(4000),
#   msg_ctn           VARCHAR2(4000),
#   MSG_TXT_CTN       VARCHAR2(4000)
# );

# comment on table TB_RPJTE_MSG_TMP_M
#   is '메시지 입력 임시 테이블';

# 메시지를 새로 추가합니다. 
# insert into tb_rpjte_msg_m
# WITH msg_tmp AS (SELECT Z1.*
#           FROM (
#                SELECT msg_ctn
#                     , MSG_TXT_CTN
#                     , FILE_PATH
#                     , RANK() OVER(PARTITION BY msg_ctn ORDER BY seq) AS rnk
#                  FROM TB_RPJTE_MSG_TMP_M 
#                ) Z1
#          WHERE Z1.rnk = 1)
# select aa.msg_ctn
#      , aa.lang_cd
#      , replace(( select zz.MSG_TXT_CTN || '(' || aa.lang_cd || ')' from msg_tmp zz where zz.msg_ctn = aa.msg_ctn ),'(ko)','') as msg_txt_ctn
#      , ( select zz.MSG_TXT_CTN from msg_tmp zz where zz.msg_ctn = aa.msg_ctn ) as rmk
#      , ( select zz.FILE_PATH from msg_tmp zz where zz.msg_ctn = aa.msg_ctn ) as opt_val_ctn1
#      , '' as opt_val_ctn2
#      , '' as opt_val_ctn3     
#      , 'Y' as use_yn
#      , 'TSX_EXTRACT' as DATA_INS_USER_ID
#      , '0.0.0.0'
#      , sysdate
#      , 'TSX_EXTRACT'  as DATA_UPD_USER_ID
#      , '0.0.0.0'
#      , sysdate
# from (
# select a.msg_ctn as msg_ctn
#      , b.cmn_cd  as lang_cd
#   from msg_tmp a
#   cross join ( select bb.cmn_cd from tb_rpjte_cmn_c bb where bb.cmn_gr_cd = 'LANG_CD') b

# minus

# select c.msg_ctn
#      , c.lang_cd
#   from tb_rpjte_msg_m c
# ) aa
# ;

#postgresql용

# INSERT INTO tb_rpjte_msg_m
# WITH msg_tmp AS (
#     SELECT Z1.*
#     FROM (
#         SELECT msg_ctn,
#                MSG_TXT_CTN,
#                FILE_PATH,
#                RANK() OVER(PARTITION BY msg_ctn ORDER BY seq) AS rnk
#         FROM TB_RPJTE_MSG_TMP_M
#     ) Z1
#     WHERE Z1.rnk = 1
# )
# SELECT aa.msg_ctn,
#        aa.lang_cd,
#        REPLACE(
#            (SELECT zz.MSG_TXT_CTN || '(' || aa.lang_cd || ')' 
#             FROM msg_tmp zz 
#             WHERE zz.msg_ctn = aa.msg_ctn), 
#            '(ko)', ''
#        ) AS msg_txt_ctn,
#        (SELECT zz.MSG_TXT_CTN 
#         FROM msg_tmp zz 
#         WHERE zz.msg_ctn = aa.msg_ctn) AS rmk,
#        (SELECT zz.FILE_PATH 
#         FROM msg_tmp zz 
#         WHERE zz.msg_ctn = aa.msg_ctn) AS opt_val_ctn1,
#        '' AS opt_val_ctn2,
#        '' AS opt_val_ctn3,
#        'Y' AS use_yn,
#        'TSX_EXTRACT' AS DATA_INS_USER_ID,
#        '0.0.0.0' AS DATA_INS_IP,
#        CURRENT_TIMESTAMP AS DATA_INS_TIMESTAMP,
#        'TSX_EXTRACT' AS DATA_UPD_USER_ID,
#        '0.0.0.0' AS DATA_UPD_IP,
#        CURRENT_TIMESTAMP AS DATA_UPD_TIMESTAMP
# FROM (
#     SELECT a.msg_ctn AS msg_ctn,
#            b.cmn_cd AS lang_cd
#     FROM msg_tmp a
#     CROSS JOIN (
#         SELECT bb.cmn_cd 
#         FROM tb_rpjte_cmn_c bb 
#         WHERE bb.cmn_gr_cd = 'LANG_CD'
#     ) b
#     EXCEPT
#     SELECT c.msg_ctn,
#            c.lang_cd
#     FROM tb_rpjte_msg_m c
# ) aa;



# 사용하지 않는 메시지는 삭제합니다.
# -- SELECT *
# DELETE
#   FROM  tb_rpjte_msg_m a
# WHERE ( a.msg_ctn , a.lang_cd ) IN (
# select c.msg_ctn
#      , c.lang_cd
#   from tb_rpjte_msg_m c
#  WHERE c.data_ins_user_id = 'TSX_EXTRACT'
# minus
# select a.msg_ctn as msg_ctn
#      , b.cmn_cd  as lang_cd
#   from (SELECT Z1.*
#           FROM (
#                SELECT msg_ctn
#                     , MSG_TXT_CTN
#                     , RANK() OVER(PARTITION BY msg_ctn ORDER BY seq) AS rnk
#                  FROM TB_RPJTE_MSG_TMP_M 
#                ) Z1
#          WHERE Z1.rnk = 1) a
#   cross join ( select bb.cmn_cd from tb_rpjte_cmn_c bb where bb.cmn_gr_cd = 'LANG_CD') b
# )
# ;



import re
import glob

# path = r'C:\workspace\glsp-fe\src\**\*.tsx'
# path = r'.\**\*.tsx'
# file_list = glob.glob(path, recursive = True)

# print(file_list)


# results = []
# matches = []

# pattern = r"[\s^\W]t\(\s*?['']+.+?['']+\s*?,\s*?['']+?.+?['']+?\s*?[\),]"


# for tsx_file in file_list:

#     with open(tsx_file, encoding='utf8') as f:
#         content = f.read().replace('\n','')
#         matches = re.findall(pattern,content)
#         # print(matches)
        
        
#         clean_pattern1 = r"[\s^\W]t\(\s*?['']+"
#         clean_pattern2 = r"['']+\s*?,\s*?['']+"
#         clean_pattern3 = r"['']+\s*?[\),]"
#         for message in matches:
#             # message = re.sub(clean_pattern1, "t('", message)
#             # message = re.sub(clean_pattern2, "','", message)
#             # message = re.sub(clean_pattern3, "')", message)
            
#             message = re.sub(clean_pattern1, "\t", message)
#             message = re.sub(clean_pattern2, "\t", message)
#             message = re.sub(clean_pattern3, "\t", message)
#             message = tsx_file + "\t" + message
#             results.append(message)
        
    

# write_file = open("out-fe.txt", "w", encoding="utf8")

# for index, value in enumerate(results):
#     # print(value.decode('cp949'))
#     write_file.write(value + '\n')
    
# write_file.close()

path = r'.\**\*.tsx'
file_list = glob.glob(path, recursive=True)

print("조사된 파일 목록:", file_list)

results = []

# 정규식 패턴 설정
pattern = r"t\(\s*?['\"].+?['\"],\s*?['\"].+?['\"].*?[\),]"

for tsx_file in file_list:
    try:
        with open(tsx_file, encoding='utf8') as f:
            content = f.read().replace('\n', '')
            matches = re.findall(pattern, content)

            # 수정된 패턴
            clean_pattern1 = r"t\(\s*?['\"']+"
            clean_pattern2 = r"['\"']+\s*?,\s*?['\"']+"
            clean_pattern3 = r"['\"']+\s*?[\),]"

            for message in matches:
                message = re.sub(clean_pattern1, "", message)  # 패턴1을 제거
                message = re.sub(clean_pattern2, ",", message)  # 패턴2를 쉼표로 대체
                message = re.sub(clean_pattern3, "", message)  # 패턴3을 제거
                message = tsx_file + "\t" + message
                results.append(message)
                
    except Exception as e:
        print(f"파일을 읽는 중 오류 발생: {tsx_file}, 오류: {e}")

# 결과를 파일로 저장
with open("out-fe.txt", "w", encoding="utf8") as write_file:
    for value in results:
        write_file.write(value + '\n')

print("추출 완료. 결과는 'out-fe.txt' 파일에 저장되었습니다.")