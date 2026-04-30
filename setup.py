from setuptools import setup, find_packages

setup(
    name='django-toastify',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Django>=3.2',
    ],
    description='Toast notifications for Django messages',
    author='Prakash Thapa',
)